const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// GET /api/dashboard/:userId - Get dashboard data
router.get('/:userId', dashboardController.getDashboard);

// GET /api/dashboard/categories/:userId - Get category statistics
router.get('/categories/:userId', dashboardController.getCategoryStats);

module.exports = router;
