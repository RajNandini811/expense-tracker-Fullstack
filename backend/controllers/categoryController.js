const db = require('../config/database');

// Get all categories
exports.getCategories = (req, res) => {
    try {
        const categories = db.getAllCategories();

        res.json({
            success: true,
            count: categories.length,
            categories: categories
        });

    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching categories'
        });
    }
};

// Get category by name
exports.getCategory = (req, res) => {
    try {
        const categoryName = req.params.name;
        const category = db.getCategoryByName(categoryName);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.json({
            success: true,
            category: category
        });

    } catch (error) {
        console.error('Get category error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
