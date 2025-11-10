from rest_framework import serializers
from .models import Booking, Menu
from django.contrib.auth.models import User


class BookingSerializer(serializers.ModelSerializer):
    """Serializer for Booking model"""
    class Meta:
        model = Booking
        fields = '__all__'


class MenuSerializer(serializers.ModelSerializer):
    """Serializer for Menu model"""
    class Meta:
        model = Menu
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']
