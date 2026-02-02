from rest_framework import serializers
from .models import Auction, Bid, Transaction
from accounts.serializers import UserSerializer

class BidSerializer(serializers.ModelSerializer):
    bidder = UserSerializer(read_only=True)

    class Meta:
        model = Bid
        fields = '__all__'

class AuctionSerializer(serializers.ModelSerializer):
    seller = UserSerializer(read_only=True)
    winner = UserSerializer(read_only=True)
    bids = BidSerializer(many=True, read_only=True)

    class Meta:
        model = Auction
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
