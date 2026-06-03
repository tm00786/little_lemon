// Booking JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const token = localStorage.getItem('authToken');
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    if (!token) {
        showMessage('Please login to make a booking.', 'error');
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
        return;
    }
    
    updateLoginButton();
    loadBookings();
    
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        await createBooking();
    });
});

async function createBooking() {
    const name = document.getElementById('name').value;
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    const bookingDate = `${date}T${time}:00Z`;
    
    const token = localStorage.getItem('authToken');
    
    try {
        const response = await fetch('/api/tables/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                name: name,
                no_of_guests: parseInt(guests),
                booking_date: bookingDate
            })
        });
        
        if (response.ok) {
            showMessage('Booking created successfully!', 'success');
            document.getElementById('bookingForm').reset();
            loadBookings();
        } else {
            const data = await response.json();
            const errorMsg = Object.values(data).flat().join(' ');
            showMessage(`Booking failed: ${errorMsg}`, 'error');
        }
    } catch (error) {
        console.error('Booking error:', error);
        showMessage('An error occurred. Please try again.', 'error');
    }
}

async function loadBookings() {
    const bookingsListEl = document.getElementById('bookingsList');
    const token = localStorage.getItem('authToken');
    
    try {
        const response = await fetch('/api/tables/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            displayBookings(data);
        } else {
            bookingsListEl.innerHTML = '<div class="error">Failed to load bookings.</div>';
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
        bookingsListEl.innerHTML = '<div class="error">An error occurred while loading bookings.</div>';
    }
}

function displayBookings(bookings) {
    const bookingsListEl = document.getElementById('bookingsList');
    
    if (bookings.length === 0) {
        bookingsListEl.innerHTML = '<p>No bookings found. Create your first booking above!</p>';
        return;
    }
    
    bookingsListEl.innerHTML = bookings.map(booking => {
        const date = new Date(booking.booking_date);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return `
            <div class="booking-card">
                <div class="booking-info">
                    <h4>${booking.name}</h4>
                    <p><strong>Guests:</strong> ${booking.no_of_guests}</p>
                    <p><strong>Date:</strong> ${formattedDate}</p>
                    <p><strong>Time:</strong> ${formattedTime}</p>
                </div>
                <div class="booking-actions">
                    <button class="btn btn-small btn-danger" onclick="deleteBooking(${booking.id})">
                        Cancel
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

async function deleteBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?')) {
        return;
    }
    
    const token = localStorage.getItem('authToken');
    
    try {
        const response = await fetch(`/api/tables/${bookingId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        
        if (response.ok) {
            showMessage('Booking cancelled successfully!', 'success');
            loadBookings();
        } else {
            showMessage('Failed to cancel booking.', 'error');
        }
    } catch (error) {
        console.error('Delete error:', error);
        showMessage('An error occurred. Please try again.', 'error');
    }
}

function showMessage(message, type = 'success') {
    const messageEl = document.getElementById('authMessage');
    messageEl.textContent = message;
    messageEl.className = `message ${type}`;
    messageEl.classList.remove('hidden');
    
    setTimeout(() => {
        messageEl.classList.add('hidden');
    }, 5000);
}

function updateLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    const token = localStorage.getItem('authToken');
    
    if (token) {
        loginBtn.textContent = 'Logout';
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    } else {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/login';
        });
    }
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.href = '/';
}
