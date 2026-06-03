// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const token = localStorage.getItem('authToken');
    
    // Update login button based on auth status
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
});

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.href = '/';
}

function showMessage(message, type = 'success') {
    const messageEl = document.getElementById('authMessage');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `message ${type}`;
        messageEl.classList.remove('hidden');
        
        setTimeout(() => {
            messageEl.classList.add('hidden');
        }, 5000);
    }
}

function getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Token ${token}` : ''
    };
}
