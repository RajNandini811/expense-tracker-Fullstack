// Database configuration (In-memory storage for demo)
// Replace with MongoDB/PostgreSQL in production

class Database {
    constructor() {
        this.users = [
            {
                id: 1,
                username: 'john',
                password: 'password123',
                name: 'John Doe',
                email: 'john@example.com',
                income: 60000
            },
            {
                id: 2,
                username: 'jane',
                password: 'pass456',
                name: 'Jane Smith',
                email: 'jane@example.com',
                income: 75000
            }
        ];

        this.expenses = [
            { id: 1, userId: 1, category: 'Food', amount: 850, description: 'Lunch with colleagues', date: '2024-01-15', emoji: '🍔' },
            { id: 2, userId: 1, category: 'Transport', amount: 350, description: 'Uber to meeting', date: '2024-01-15', emoji: '🚕' },
            { id: 3, userId: 1, category: 'Shopping', amount: 2499, description: 'Amazon - headphones', date: '2024-01-14', emoji: '🛒' },
            { id: 4, userId: 1, category: 'Bills', amount: 5200, description: 'Electricity bill', date: '2024-01-14', emoji: '💡' },
            { id: 5, userId: 1, category: 'Entertainment', amount: 1200, description: 'Movie tickets', date: '2024-01-13', emoji: '🎬' },
            { id: 6, userId: 1, category: 'Health', amount: 500, description: 'Pharmacy', date: '2024-01-13', emoji: '🏥' },
            { id: 7, userId: 1, category: 'Food', amount: 1200, description: 'Restaurant dinner', date: '2024-01-12', emoji: '🍔' },
            { id: 8, userId: 1, category: 'Food', amount: 3500, description: 'Groceries', date: '2024-01-11', emoji: '🍔' },
            { id: 9, userId: 1, category: 'Transport', amount: 2100, description: 'Monthly bus pass', date: '2024-01-10', emoji: '🚕' },
            { id: 10, userId: 1, category: 'Shopping', amount: 1800, description: 'Clothing', date: '2024-01-09', emoji: '🛒' }
        ];

        this.categories = [
            { name: 'Food', emoji: '🍔', color: '#ef4444' },
            { name: 'Transport', emoji: '🚕', color: '#3b82f6' },
            { name: 'Shopping', emoji: '🛒', color: '#8b5cf6' },
            { name: 'Bills', emoji: '💡', color: '#f59e0b' },
            { name: 'Entertainment', emoji: '🎬', color: '#ec4899' },
            { name: 'Health', emoji: '🏥', color: '#10b981' }
        ];

        this.expenseIdCounter = 11;
        this.userIdCounter = 3;
    }

    // User methods
    getAllUsers() {
        return this.users;
    }

    getUserById(id) {
        return this.users.find(u => u.id === parseInt(id));
    }

    getUserByUsername(username) {
        return this.users.find(u => u.username === username);
    }

    createUser(userData) {
        const newUser = {
            id: this.userIdCounter++,
            ...userData
        };
        this.users.push(newUser);
        return newUser;
    }

    // Expense methods
    getAllExpenses() {
        return this.expenses;
    }

    getExpensesByUserId(userId) {
        return this.expenses.filter(e => e.userId === parseInt(userId));
    }

    getExpenseById(id) {
        return this.expenses.find(e => e.id === parseInt(id));
    }

    createExpense(expenseData) {
        const newExpense = {
            id: this.expenseIdCounter++,
            ...expenseData
        };
        this.expenses.unshift(newExpense);
        return newExpense;
    }

    deleteExpense(id) {
        const index = this.expenses.findIndex(e => e.id === parseInt(id));
        if (index !== -1) {
            this.expenses.splice(index, 1);
            return true;
        }
        return false;
    }

    updateExpense(id, updates) {
        const expense = this.getExpenseById(id);
        if (expense) {
            Object.assign(expense, updates);
            return expense;
        }
        return null;
    }

    // Category methods
    getAllCategories() {
        return this.categories;
    }

    getCategoryByName(name) {
        return this.categories.find(c => c.name === name);
    }
}

// Create singleton instance
const db = new Database();

module.exports = db;
