const db = require('../config/database');

// Get all expenses for a user
exports.getExpenses = (req, res) => {
    try {
        const userId = req.params.userId;
        const expenses = db.getExpensesByUserId(userId);

        res.json({
            success: true,
            count: expenses.length,
            expenses: expenses
        });

    } catch (error) {
        console.error('Get expenses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching expenses'
        });
    }
};

// Get single expense
exports.getExpense = (req, res) => {
    try {
        const expenseId = req.params.id;
        const expense = db.getExpenseById(expenseId);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        res.json({
            success: true,
            expense: expense
        });

    } catch (error) {
        console.error('Get expense error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create new expense
exports.createExpense = (req, res) => {
    try {
        const { userId, category, amount, description, date } = req.body;

        // Validation
        if (!userId || !category || !amount || !description || !date) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required (userId, category, amount, description, date)'
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Amount must be greater than 0'
            });
        }

        // Get category info for emoji
        const categoryInfo = db.getCategoryByName(category);
        const emoji = categoryInfo ? categoryInfo.emoji : '💰';

        // Create expense
        const newExpense = db.createExpense({
            userId: parseInt(userId),
            category,
            amount: parseFloat(amount),
            description,
            date,
            emoji
        });

        res.status(201).json({
            success: true,
            message: 'Expense added successfully',
            expense: newExpense
        });

    } catch (error) {
        console.error('Create expense error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating expense'
        });
    }
};

// Update expense
exports.updateExpense = (req, res) => {
    try {
        const expenseId = req.params.id;
        const updates = req.body;

        const updatedExpense = db.updateExpense(expenseId, updates);

        if (!updatedExpense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        res.json({
            success: true,
            message: 'Expense updated successfully',
            expense: updatedExpense
        });

    } catch (error) {
        console.error('Update expense error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating expense'
        });
    }
};

// Delete expense
exports.deleteExpense = (req, res) => {
    try {
        const expenseId = req.params.id;
        const deleted = db.deleteExpense(expenseId);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        res.json({
            success: true,
            message: 'Expense deleted successfully'
        });

    } catch (error) {
        console.error('Delete expense error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting expense'
        });
    }
};
