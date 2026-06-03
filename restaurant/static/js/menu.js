// Menu JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    updateLoginButton();
});

async function loadMenu() {
    const menuItemsEl = document.getElementById('menuItems');
    const token = localStorage.getItem('authToken');
    
    try {
        const headers = token ? {
            'Authorization': `Token ${token}`
        } : {};
        
        const response = await fetch('/restaurant/menu/', {
            headers: headers
        });
        
        if (response.status === 401) {
            menuItemsEl.innerHTML = `
                <div class="message error">
                    <p>Please <a href="/login">login</a> to view the menu.</p>
                </div>
            `;
            return;
        }
        
        if (response.ok) {
            const data = await response.json();
            displayMenu(data);
        } else {
            menuItemsEl.innerHTML = '<div class="error">Failed to load menu items.</div>';
        }
    } catch (error) {
        console.error('Error loading menu:', error);
        menuItemsEl.innerHTML = '<div class="error">An error occurred while loading the menu.</div>';
    }
}

function displayMenu(menuItems) {
    const menuItemsEl = document.getElementById('menuItems');
    
    if (menuItems.length === 0) {
        menuItemsEl.innerHTML = '<p>No menu items available at the moment.</p>';
        return;
    }
    
    menuItemsEl.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <h3>${item.title}</h3>
            <p class="price">$${parseFloat(item.price).toFixed(2)}</p>
            <p class="inventory">Available: ${item.inventory} servings</p>
        </div>
    `).join('');
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
