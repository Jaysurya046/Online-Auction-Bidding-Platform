---
description: How to start the whole auction system
---
// turbo-all
1. Start Redis Server (ensure it's running on 6379)
2. Start Django Backend & Worker:
   - Run `cd backend`
   - Run `.\venv\Scripts\activate`
   - Run `python manage.py runserver`
   - (In another terminal) Run `python manage.py process_bids`
3. Start Real-time Service:
   - Run `cd realtime`
   - Run `npm start`
4. Start Frontends:
   - Marketplace: `cd frontend-marketplace && npm run dev`
   - Admin: `cd frontend-admin && npm run dev`
