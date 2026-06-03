// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tab}Tab`).classList.add('active');
        });
    });
    
    // Login form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            const response = await fetch('/auth/token/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('authToken', data.auth_token);
                localStorage.setItem('username', username);
                showMessage('Login successful! Redirecting...', 'success');
                
                setTimeout(() => {
                    window.location.href = '/menu';
                }, 1500);
            } else {
                showMessage('Login failed. Please check your credentials.', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showMessage('An error occurred. Please try again.', 'error');
        }
    });
    
    // Register form submission
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        try {
            const response = await fetch('/auth/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            });
            
            if (response.ok) {
                showMessage('Registration successful! Please login.', 'success');
                
                // Switch to login tab
                setTimeout(() => {
                    document.querySelector('[data-tab=\"login\"]').click();
                    document.getElementById('loginUsername').value = username;
                }, 1500);
            } else {
                const data = await response.json();
                const errorMsg = Object.values(data).flat().join(' ');
                showMessage(`Registration failed: ${errorMsg}`, 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            showMessage('An error occurred. Please try again.', 'error');
        }
    });
});

function showMessage(message, type = 'success') {
    const messageEl = document.getElementById('authMessage');
    messageEl.textContent = message;
    messageEl.className = `message ${type}`;
    messageEl.classList.remove('hidden');
    
    setTimeout(() => {
        messageEl.classList.add('hidden');
    }, 5000);
}
