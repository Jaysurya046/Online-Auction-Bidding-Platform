import os
import django
from django.utils import timezone
from datetime import timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'auction_core.settings')
django.setup()

from auctions.models import Auction
from accounts.models import User

def seed():
    # Create superuser if not exists
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123', role='admin')
        print("Created superuser: admin/admin123")

    # Create seller
    seller, _ = User.objects.get_or_create(username='seller1', defaults={'role': 'seller'})
    seller.set_password('seller123')
    seller.save()

    # Create buyer
    buyer, _ = User.objects.get_or_create(username='buyer1', defaults={'role': 'buyer'})
    buyer.set_password('buyer123')
    buyer.save()

    # Create auctions
    auctions_data = [
        {"title": "Cyber-Punk Watch V1", "starting_price": 1000, "description": "A rare timepiece from the future."},
        {"title": "Neural Link Console", "starting_price": 5000, "description": "Direct brain-to-game interface."},
        {"title": "Virtual Real Estate #402", "starting_price": 10000, "description": "Prime location in the Metaverse."},
        {"title": "Void Space Sneakers", "starting_price": 500, "description": "They float. Literally."},
    ]

    for item in auctions_data:
        Auction.objects.get_or_create(
            title=item['title'],
            defaults={
                'description': item['description'],
                'starting_price': item['starting_price'],
                'current_price': item['starting_price'],
                'start_time': timezone.now(),
                'end_time': timezone.now() + timedelta(days=7),
                'seller': seller,
                'status': 'active'
            }
        )
    print("Seed data created successfully.")

if __name__ == "__main__":
    seed()
