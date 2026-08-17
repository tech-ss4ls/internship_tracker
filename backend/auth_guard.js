// This file runs immediately when index.html loads
// It checks if user is logged in and redirects if not

const API_URL = 'http://localhost:3000/api';

async function checkAuthAndRedirect() {
    const token = localStorage.getItem('authToken');
    
    // No token found - redirect to login
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        // Verify token is still valid with backend
        const response = await fetch(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            // Token invalid or expired
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = 'login.html';
            return;
        }
        
        // Token is valid - user can stay on page
        const userData = await response.json();
        // Optionally store fresh user data
        localStorage.setItem('user', JSON.stringify(userData));
        
        // User is authenticated, page will load normally
        console.log('✅ User authenticated:', userData.email);
        
    } catch (error) {
        console.error('Auth check error:', error);
        // On network error, still redirect to be safe
        window.location.href = 'login.html';
    }
}

// Execute immediately when script loads
checkAuthAndRedirect();