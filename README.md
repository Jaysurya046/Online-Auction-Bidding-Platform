# Online Auction & Bidding Platform

A scalable, high-concurrency auction platform featuring a Django core for management and a Node.js microservice for real-time bidding events.

## Architecture Highlights
- **Django (Backend)**: Source of truth, REST API, User Auth (JWT), and Auction State Management.
- **Node.js (Real-time)**: High-speed bidding engine using Socket.io and Redis for atomic validation and locking.
- **Redis**: Serves as the real-time cache and message queue between the Node.js service and Django worker.
- **Next.js (Marketplace)**: Premium, SEO-optimized buyer experience.
- **React (Admin)**: Modern dashboard for sellers/admins.

## Concurrency Control
- **Atomic Locking**: Node.js uses Redis distributed locks (`SET NX EX`) to ensure only one bid per auction is processed at a millisecond level.
- **Conflict Resolution**: Bids are validated against the real-time price in Redis before being queued for permanent storage in the database.
- **Async Persistence**: Bids are pushed to a Redis List (`bid_queue`) and processed by a Django management command to ensure the main database isn't a bottleneck during "last-second" bidding wars.

## Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 20+
- Redis Server (Running on localhost:6379)
- PostgreSQL (Optional, defaults to SQLite for local dev)

### 1. Backend (Django)
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python seed_data.py
python manage.py runserver
```
*Run the background worker in a separate terminal:*
```bash
python manage.py process_bids
```

### 2. Real-time Service (Node.js)
```bash
cd realtime
npm install
npm start
```

### 3. Marketplace (Next.js)
```bash
cd frontend-marketplace
npm install
npm run dev
```

### 4. Admin Dashboard (React)
```bash
cd frontend-admin
npm install
npm run dev
```

## Docker Setup
Alternatively, use Docker Compose to spin up the entire infrastructure:
```bash
docker-compose up --build
```
