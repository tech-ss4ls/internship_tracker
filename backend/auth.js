const API_URL = 'http://localhost:3000/api';

// Handle Login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                const messageDiv = document.getElementById('message');
                
                if (response.ok) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    messageDiv.innerHTML = '<p style="color: green;">✅ Login successful! Redirecting...</p>';

                    // Redirect to index if already logged in
                    setTimeout(() => window.location.href = 'index.html', 1500);
                } else {
                    messageDiv.innerHTML = `<p style="color: red;">❌ ${data.error}</p>`;
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('message').innerHTML = '<p style="color: red;">❌ Server error. Is the backend running?</p>';
            }
        });
    }
    
    // Handle Signup
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            try {
                const response = await fetch(`${API_URL}/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, fullName })
                });
                
                const data = await response.json();
                const messageDiv = document.getElementById('message');
                
                if (response.ok) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    messageDiv.innerHTML = '<p style="color: green;">✅ Account created! Redirecting...</p>';

                    // Redirect to index page
                    setTimeout(() => window.location.href = 'index.html', 1500);
                } else {
                    messageDiv.innerHTML = `<p style="color: red;">❌ ${data.error}</p>`;
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('message').innerHTML = '<p style="color: red;">❌ Server error. Is the backend running?</p>';
            }
        });
    }
});
// Logout from the index page
function logout(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

function handleAuthError(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = 'login.html?error=session_expired';
}
// Protect dashboard page
if (window.location.pathname.includes('dashboard.html')) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
    } else {
        // Fetch user data to verify token
        fetch(`${API_URL}/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            if (!res.ok) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                window.location.href = 'login.html';
            }
            return res.json();
        })
        .then(user => {
            document.getElementById('userName').textContent = user.full_name || 'User';
        })
        .catch(() => {
            window.location.href = 'login.html';
        });
    }
}