const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoryRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Expense Tracker API is running',
        version: '1.0.0',
        endpoints: {
            auth: {
                login: 'POST /api/auth/login',
                register: 'POST /api/auth/register',
                getUser: 'GET /api/auth/user/:userId'
            },
            expenses: {
                getAll: 'GET /api/expenses/:userId',
                getSingle: 'GET /api/expenses/single/:id',
                create: 'POST /api/expenses',
                update: 'PUT /api/expenses/:id',
                delete: 'DELETE /api/expenses/:id'
            },
            dashboard: {
                getDashboard: 'GET /api/dashboard/:userId',
                getCategoryStats: 'GET /api/dashboard/categories/:userId'
            },
            categories: {
                getAll: 'GET /api/categories',
                getSingle: 'GET /api/categories/:name'
            }
        }
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is healthy',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        path: req.path
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log('\n════════════════════════════════════════════════');
    console.log('  💰 EXPENSE TRACKER API SERVER');
    console.log('════════════════════════════════════════════════');
    console.log(`  ✅ Server running on: http://localhost:${PORT}`);
    console.log(`  ✅ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('════════════════════════════════════════════════');
    console.log('  📚 API Endpoints:');
    console.log(`     • Auth:       http://localhost:${PORT}/api/auth`);
    console.log(`     • Expenses:   http://localhost:${PORT}/api/expenses`);
    console.log(`     • Dashboard:  http://localhost:${PORT}/api/dashboard`);
    console.log(`     • Categories: http://localhost:${PORT}/api/categories`);
    console.log('════════════════════════════════════════════════');
    console.log('  🔧 Demo Credentials:');
    console.log('     Username: john');
    console.log('     Password: password123');
    console.log('════════════════════════════════════════════════\n');
});

module.exports = app;
