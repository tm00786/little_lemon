from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Menu, Booking
from datetime import datetime


class MenuViewTest(TestCase):
    """Test cases for Menu API"""
    
    def setUp(self):
        """Set up test data"""
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
        
        # Create test menu items
        Menu.objects.create(title='Pizza', price=12.99, inventory=10)
        Menu.objects.create(title='Burger', price=8.99, inventory=15)
    
    def test_getall_menu(self):
        """Test retrieving all menu items"""
        response = self.client.get('/restaurant/menu/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)


class BookingViewTest(TestCase):
    """Test cases for Booking API"""
    
    def setUp(self):
        """Set up test data"""
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
        
        # Create test booking
        Booking.objects.create(
            name='John Doe',
            no_of_guests=4,
            booking_date=datetime(2024, 12, 25, 19, 0)
        )
    
    def test_getall_bookings(self):
        """Test retrieving all bookings"""
        response = self.client.get('/api/tables/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class MenuModelTest(TestCase):
    """Test cases for Menu model"""
    
    def test_create_menu_item(self):
        """Test creating a menu item"""
        item = Menu.objects.create(
            title='Pasta',
            price=14.99,
            inventory=20
        )
        self.assertEqual(str(item), 'Pasta : 14.99')


class BookingModelTest(TestCase):
    """Test cases for Booking model"""
    
    def test_create_booking(self):
        """Test creating a booking"""
        booking_date = datetime(2024, 12, 25, 19, 0)
        booking = Booking.objects.create(
            name='Jane Doe',
            no_of_guests=2,
            booking_date=booking_date
        )
        self.assertIn('Jane Doe', str(booking))
