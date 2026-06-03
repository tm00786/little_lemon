from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Booking, Menu
from .serializers import BookingSerializer, MenuSerializer, UserSerializer
from django.contrib.auth.models import User


def index(request):
    """Render the index page"""
    return render(request, 'index.html', {})


def menu_page(request):
    """Render the menu page"""
    return render(request, 'menu.html', {})


def booking_page(request):
    """Render the booking page"""
    return render(request, 'booking.html', {})


def login_page(request):
    """Render the login page"""
    return render(request, 'login.html', {})


class MenuItemsView(generics.ListCreateAPIView):
    """API view for listing and creating menu items"""
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [IsAuthenticated]


class SingleMenuItemView(generics.RetrieveUpdateDestroyAPIView):
    """API view for retrieving, updating and deleting a single menu item"""
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [IsAuthenticated]


class BookingViewSet(viewsets.ModelViewSet):
    """ViewSet for handling booking operations"""
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for handling user operations"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
