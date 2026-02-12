const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET /api/categories - Get all categories
router.get('/', categoryController.getCategories);

// GET /api/categories/:name - Get single category
router.get('/:name', categoryController.getCategory);

module.exports = router;
