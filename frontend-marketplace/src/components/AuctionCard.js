export default function AuctionCard({ title, price, timeLeft, image }) {
    return (
        <div className="glass p-4 group transition-all hover:scale-[1.02] cursor-pointer">
            <div className="relative h-60 w-full mb-4 rounded-xl overflow-hidden bg-white/5">
                <img src={image || 'https://via.placeholder.com/400x300'} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                    LIVE
                </div>
            </div>
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl">{title}</h3>
                <div className="text-gray-400 text-sm">{timeLeft} left</div>
            </div>
            <div className="flex justify-between items-center mt-6">
                <div>
                    <div className="text-gray-500 text-xs uppercase font-bold tracking-widest">Current Bid</div>
                    <div className="text-2xl font-black">${price}</div>
                </div>
                <button className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                    Place Bid
                </button>
            </div>
        </div>
    );
}
