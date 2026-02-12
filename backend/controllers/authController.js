const db = require('../config/database');

// Login controller
exports.login = (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        // Find user
        const user = db.getUserByUsername(username);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        // Return user data (without password)
        const { password: pwd, ...userData } = user;

        res.json({
            success: true,
            message: 'Login successful',
            user: userData
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};

// Register controller (optional - for future use)
exports.register = (req, res) => {
    try {
        const { username, password, name, email, income } = req.body;

        // Validation
        if (!username || !password || !name) {
            return res.status(400).json({
                success: false,
                message: 'Username, password, and name are required'
            });
        }

        // Check if user already exists
        const existingUser = db.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists'
            });
        }

        // Create new user
        const newUser = db.createUser({
            username,
            password,
            name,
            email: email || '',
            income: income || 0
        });

        // Return user data (without password)
        const { password: pwd, ...userData } = newUser;

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: userData
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
};

// Get current user
exports.getCurrentUser = (req, res) => {
    try {
        const userId = req.params.userId;
        const user = db.getUserById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const { password, ...userData } = user;

        res.json({
            success: true,
            user: userData
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
