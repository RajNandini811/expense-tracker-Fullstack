const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// GET /api/expenses/:userId - Get all expenses for a user
router.get('/:userId', expenseController.getExpenses);

// GET /api/expenses/single/:id - Get single expense
router.get('/single/:id', expenseController.getExpense);

// POST /api/expenses - Create new expense
router.post('/', expenseController.createExpense);

// PUT /api/expenses/:id - Update expense
router.put('/:id', expenseController.updateExpense);

// DELETE /api/expenses/:id - Delete expense
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
