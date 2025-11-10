# Little Lemon Restaurant API

This is a Django REST Framework project for the Little Lemon restaurant, implementing table booking and menu management APIs.

## Features

- User registration and authentication
- Menu management API
- Table booking API
- MySQL database integration
- Token-based authentication
- Unit tests
- Static HTML serving

## Installation

1. Install Python 3.8 or higher
2. Install MySQL Server
3. Install required packages:
   ```
   pip install -r requirements.txt
   ```

## Database Setup

1. Create a MySQL database named 'littlelemon'
2. Update database credentials in littlelemon/settings.py
3. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

## Create Superuser

```
python manage.py createsuperuser
```

## Run Server

```
python manage.py runserver
```

The application will be available at http://127.0.0.1:8000/

## API Endpoints

### Authentication
- POST /auth/users/ - User registration
- POST /auth/token/login/ - User login (get token)
- POST /auth/token/logout/ - User logout

### Menu API
- GET /restaurant/menu/ - List all menu items
- POST /restaurant/menu/ - Create a new menu item
- GET /restaurant/menu/{id}/ - Retrieve a specific menu item
- PUT /restaurant/menu/{id}/ - Update a menu item
- DELETE /restaurant/menu/{id}/ - Delete a menu item

### Booking API
- GET /api/tables/ - List all bookings
- POST /api/tables/ - Create a new booking
- GET /api/tables/{id}/ - Retrieve a specific booking
- PUT /api/tables/{id}/ - Update a booking
- DELETE /api/tables/{id}/ - Delete a booking

## Testing with Insomnia/Postman

1. Register a new user:
   - URL: http://127.0.0.1:8000/auth/users/
   - Method: POST
   - Body: {"username": "testuser", "password": "testpass123"}

2. Login to get token:
   - URL: http://127.0.0.1:8000/auth/token/login/
   - Method: POST
   - Body: {"username": "testuser", "password": "testpass123"}

3. Use the token in Authorization header for other API requests:
   - Header: Authorization: Token {your_token_here}

4. Create a menu item:
   - URL: http://127.0.0.1:8000/restaurant/menu/
   - Method: POST
   - Headers: Authorization: Token {your_token_here}
   - Body: {"title": "Pizza", "price": "12.99", "inventory": 10}

5. Create a booking:
   - URL: http://127.0.0.1:8000/api/tables/
   - Method: POST
   - Headers: Authorization: Token {your_token_here}
   - Body: {"name": "John Doe", "no_of_guests": 4, "booking_date": "2024-12-25T19:00:00Z"}

## Running Tests

```
python manage.py test
```

## Admin Panel

Access the admin panel at http://127.0.0.1:8000/admin/
Login with your superuser credentials.

## API Paths for Peer Review

/auth/users/
/auth/token/login/
/restaurant/menu/
/api/tables/
