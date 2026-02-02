from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuctionViewSet, BidViewSet, TransactionViewSet

router = DefaultRouter()
router.register(r'listings', AuctionViewSet)
router.register(r'bids', BidViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
