// Authentication Module
const Auth = {
    currentUser: null,

    // Initialize auth
    init() {
        const savedUser = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                return true;
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem(CONFIG.STORAGE_KEY);
            }
        }
        return false;
    },

    // Login
    async login(username, password) {
        try {
            // Client-side validation
            if (!username || !password) {
                throw new Error('Username and password are required');
            }

            const response = await fetch(API.AUTH.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.success) {
                this.currentUser = data.user;
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data.user));
                return { success: true, user: data.user };
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                message: error.message || 'Failed to connect to server'
            };
        }
    },

    // Logout
    logout() {
        this.currentUser = null;
        localStorage.removeItem(CONFIG.STORAGE_KEY);
    },

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    },

    // Check if logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }
};
