// Main Application Controller
const App = {
    // Initialize application
    async init() {
        console.log('🚀 Initializing Expense Tracker...');

        // Set default date
        UI.setDefaultDate();

        // Check if user is logged in
        if (Auth.init()) {
            console.log('✅ User already logged in');
            await this.showDashboard();
        } else {
            console.log('📝 Showing login page');
            UI.showPage('loginPage');
        }

        // Setup event listeners
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', this.handleLogin.bind(this));

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click', this.handleLogout.bind(this));

        // Expense form
        const expenseForm = document.getElementById('expenseForm');
        expenseForm.addEventListener('submit', this.handleAddExpense.bind(this));
    },

    // Handle login
    async handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const submitBtn = e.target.querySelector('button[type="submit"]');

        UI.hideLoginError();
        UI.setButtonLoading(submitBtn, true);

        try {
            const result = await Auth.login(username, password);

            if (result.success) {
                UI.showToast('Login successful!', 'success');
                await this.showDashboard();
            } else {
                UI.showLoginError(result.message);
            }
        } catch (error) {
            UI.showLoginError('An unexpected error occurred');
            console.error('Login error:', error);
        } finally {
            UI.setButtonLoading(submitBtn, false);
        }
    },

    // Handle logout
    handleLogout() {
        Auth.logout();
        UI.showPage('loginPage');
        
        // Reset forms
        document.getElementById('loginForm').reset();
        document.getElementById('expenseForm').reset();
        UI.hideLoginError();
        UI.setDefaultDate();
        
        UI.showToast('Logged out successfully', 'success');
        
        console.log('👋 User logged out');
    },

    // Show dashboard
    async showDashboard() {
        const user = Auth.getCurrentUser();
        
        if (!user) {
            console.error('No user found');
            UI.showPage('loginPage');
            return;
        }

        console.log('📊 Loading dashboard for user:', user.name);

        // Show dashboard page
        UI.showPage('dashboardPage');

        // Update user info
        document.getElementById('userName').textContent = `Welcome, ${user.name}!`;

        // Load data
        try {
            await Expenses.loadCategories();
            await Dashboard.loadData(user.id);
            await Expenses.loadExpenses(user.id);
            
            console.log('✅ Dashboard loaded successfully');
        } catch (error) {
            console.error('Error loading dashboard:', error);
            UI.showToast('Error loading dashboard data', 'error');
        }
    },

    // Handle add expense
    async handleAddExpense(e) {
        e.preventDefault();

        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const description = document.getElementById('description').value.trim();
        const date = document.getElementById('date').value;
        const user = Auth.getCurrentUser();
        const submitBtn = e.target.querySelector('button[type="submit"]');

        try {
            // Validate form
            Expenses.validateExpenseForm(category, amount, description, date);

            UI.setButtonLoading(submitBtn, true);

            // Create expense
            const result = await Expenses.createExpense({
                userId: user.id,
                category,
                amount,
                description,
                date
            });

            if (result.success) {
                // Reset form
                e.target.reset();
                UI.setDefaultDate();

                // Reload data
                await Dashboard.refresh(user.id);
                await Expenses.loadExpenses(user.id);
            }
        } catch (error) {
            UI.showToast(error.message, 'error');
        } finally {
            UI.setButtonLoading(submitBtn, false);
        }
    }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('💰 Expense Tracker Application');
    console.log('════════════════════════════════');
    App.init();
});
