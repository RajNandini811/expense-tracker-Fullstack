// Expenses Module
const Expenses = {
    expenses: [],
    categories: [],

    // Load categories
    async loadCategories() {
        try {
            const response = await fetch(API.CATEGORIES.GET_ALL);
            const data = await response.json();

            if (data.success) {
                this.categories = data.categories;
                this.populateCategoryDropdown();
                return { success: true };
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Load categories error:', error);
            return { success: false };
        }
    },

    // Populate category dropdown
    populateCategoryDropdown() {
        const select = document.getElementById('category');
        select.innerHTML = '<option value="">Select category...</option>';

        this.categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.name;
            option.textContent = `${cat.emoji} ${cat.name}`;
            select.appendChild(option);
        });
    },

    // Load expenses
    async loadExpenses(userId) {
        try {
            const response = await fetch(API.EXPENSES.GET_ALL(userId));
            const data = await response.json();

            if (data.success) {
                this.expenses = data.expenses;
                this.renderExpenses();
                return { success: true };
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Load expenses error:', error);
            UI.showToast('Failed to load expenses', 'error');
            return { success: false };
        }
    },

    // Render expenses
    renderExpenses() {
        const container = document.getElementById('expenseList');

        if (!this.expenses || this.expenses.length === 0) {
            container.innerHTML = '<div class="no-data"><p>📝 No expenses yet</p><p class="small">Add your first expense to get started</p></div>';
            return;
        }

        container.innerHTML = this.expenses.map(expense => {
            const date = new Date(expense.date);
            const formattedDate = date.toLocaleDateString(
                CONFIG.DATE_FORMAT.locale,
                CONFIG.DATE_FORMAT.options
            );

            return `
                <div class="expense-item">
                    <div class="expense-left">
                        <div class="expense-emoji">${expense.emoji}</div>
                        <div class="expense-info">
                            <div class="expense-category">${expense.category}</div>
                            <div class="expense-description">${expense.description}</div>
                        </div>
                    </div>
                    <div class="expense-right">
                        <div class="expense-amount">₹${expense.amount.toLocaleString()}</div>
                        <div class="expense-date">${formattedDate}</div>
                    </div>
                    <button class="expense-delete" onclick="Expenses.deleteExpense(${expense.id})">
                        Delete
                    </button>
                </div>
            `;
        }).join('');
    },

    // Create expense
    async createExpense(expenseData) {
        try {
            const response = await fetch(API.EXPENSES.CREATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expenseData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create expense');
            }

            if (data.success) {
                UI.showToast('Expense added successfully!', 'success');
                return { success: true, expense: data.expense };
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Create expense error:', error);
            UI.showToast(error.message || 'Failed to add expense', 'error');
            return { success: false };
        }
    },

    // Delete expense
    async deleteExpense(expenseId) {
        if (!confirm('Are you sure you want to delete this expense?')) {
            return;
        }

        try {
            const response = await fetch(API.EXPENSES.DELETE(expenseId), {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                UI.showToast('Expense deleted successfully!', 'success');
                
                // Refresh data
                const user = Auth.getCurrentUser();
                await this.loadExpenses(user.id);
                await Dashboard.refresh(user.id);
                
                return { success: true };
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Delete expense error:', error);
            UI.showToast(error.message || 'Failed to delete expense', 'error');
            return { success: false };
        }
    },

    // Validate expense form
    validateExpenseForm(category, amount, description, date) {
        if (!category) {
            throw new Error('Please select a category');
        }

        if (!amount || amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        if (!description || description.trim() === '') {
            throw new Error('Please enter a description');
        }

        if (!date) {
            throw new Error('Please select a date');
        }

        return true;
    }
};
