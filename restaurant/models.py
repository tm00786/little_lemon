from django.db import models


class Booking(models.Model):
    """Model for table bookings"""
    name = models.CharField(max_length=255)
    no_of_guests = models.IntegerField()
    booking_date = models.DateTimeField()
    
    class Meta:
        ordering = ['booking_date']
    
    def __str__(self):
        return f"{self.name} - {self.booking_date}"


class Menu(models.Model):
    """Model for menu items"""
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    inventory = models.IntegerField()
    
    class Meta:
        ordering = ['title']
    
    def __str__(self):
        return f"{self.title} : {str(self.price)}"
