const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Redis = require('ioredis');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Atomic bid validation logic
async function placeBid(auctionId, userId, amount) {
    const lockKey = `lock:auction:${auctionId}`;
    const priceKey = `auction:${auctionId}:price`;

    // Try to acquire lock
    const lock = await redis.set(lockKey, "locked", "NX", "EX", 2); // 2 second lock

    if (!lock) {
        throw new Error("Could not acquire lock, try again");
    }

    try {
        const currentPrice = await redis.get(priceKey);
        if (currentPrice && parseFloat(amount) <= parseFloat(currentPrice)) {
            throw new Error("Bid must be higher than current price");
        }

        // Update price in Redis
        await redis.set(priceKey, amount);
        
        // Push bid to a queue for Django to process asynchronously
        await redis.lpush('bid_queue', JSON.stringify({
            auctionId,
            userId,
            amount,
            timestamp: new Date().toISOString()
        }));

        return { success: true, newPrice: amount };
    } finally {
        await redis.del(lockKey);
    }
}

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_auction', (auctionId) => {
        socket.join(`auction_${auctionId}`);
        console.log(`User ${socket.id} joined auction ${auctionId}`);
    });

    socket.on('place_bid', async (data) => {
        const { auctionId, userId, amount } = data;
        try {
            const result = await placeBid(auctionId, userId, amount);
            io.to(`auction_${auctionId}`).emit('bid_update', {
                auctionId,
                newPrice: result.newPrice,
                bidderId: userId
            });
        } catch (error) {
            socket.emit('bid_error', { message: error.message });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Real-time bidding service running on port ${PORT}`);
});
