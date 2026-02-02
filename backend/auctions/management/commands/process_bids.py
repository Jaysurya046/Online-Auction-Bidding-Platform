import json
import time
import redis
from django.core.management.base import BaseCommand
from auctions.models import Auction, Bid
from accounts.models import User
from django.db import transaction

class Command(BaseCommand):
    help = 'Processes bids from Redis queue'

    def handle(self, *args, **options):
        r = redis.Redis(host='localhost', port=6379, db=0)
        self.stdout.write(self.style.SUCCESS('Started processing bids...'))

        while True:
            # BLPOP blocks until an item is available
            _, data = r.blpop('bid_queue')
            bid_data = json.loads(data)
            
            auction_id = bid_data['auctionId']
            user_id = bid_data['userId']
            amount = bid_data['amount']

            try:
                with transaction.atomic():
                    auction = Auction.objects.select_for_update().get(id=auction_id)
                    user = User.objects.get(id=user_id)

                    if amount > auction.current_price:
                        # Create bid record
                        Bid.objects.create(
                            auction=auction,
                            bidder=user,
                            amount=amount
                        )
                        # Update auction current price
                        auction.current_price = amount
                        auction.save()
                        self.stdout.write(self.style.SUCCESS(f'Processed bid {amount} for auction {auction_id} by user {user_id}'))
                    else:
                        self.stdout.write(self.style.WARNING(f'Skipped bid {amount} for auction {auction_id} (too low)'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error processing bid: {str(e)}'))
