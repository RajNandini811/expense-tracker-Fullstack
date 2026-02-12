const db = require('../config/database');

// Get dashboard statistics
exports.getDashboard = (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const user = db.getUserById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const userExpenses = db.getExpensesByUserId(userId);
        const categories = db.getAllCategories();

        // Calculate total spent
        const totalSpent = userExpenses.reduce((sum, e) => sum + e.amount, 0);

        // Calculate category breakdown
        const categoryBreakdown = categories.map(cat => {
            const categoryExpenses = userExpenses.filter(e => e.category === cat.name);
            const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
            const percentage = totalSpent > 0 ? (total / totalSpent * 100).toFixed(1) : 0;

            return {
                category: cat.name,
                emoji: cat.emoji,
                color: cat.color,
                amount: total,
                percentage: parseFloat(percentage),
                count: categoryExpenses.length
            };
        }).filter(cat => cat.amount > 0);

        // Sort by amount descending
        categoryBreakdown.sort((a, b) => b.amount - a.amount);

        const budgetLeft = user.income - totalSpent;
        const savingsRate = user.income > 0 ? ((budgetLeft / user.income) * 100).toFixed(1) : 0;
        const emergencyFund = user.income * 6;

        // Generate AI insights
        const insights = generateInsights(categoryBreakdown, totalSpent, user.income);

        res.json({
            success: true,
            data: {
                income: user.income,
                totalSpent: totalSpent,
                budgetLeft: budgetLeft,
                savingsRate: parseFloat(savingsRate),
                emergencyFund: emergencyFund,
                categoryBreakdown: categoryBreakdown,
                insights: insights,
                totalExpenses: userExpenses.length
            }
        });

    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching dashboard data'
        });
    }
};

// Generate AI insights
function generateInsights(categoryBreakdown, totalSpent, income) {
    const insights = [];

    // Find highest spending category
    if (categoryBreakdown.length > 0) {
        const highest = categoryBreakdown[0];
        if (highest.percentage > 30) {
            insights.push({
                type: 'warning',
                icon: '⚠️',
                title: 'High Spending Alert',
                message: `You are spending ${highest.percentage}% (₹${highest.amount.toLocaleString()}) on ${highest.category}. Consider reducing by 10% to save ₹${(highest.amount * 0.1).toFixed(0)}/month.`,
                suggestion: highest.category === 'Food'
                    ? 'Try meal prepping on weekends and limit food delivery to twice a week.'
                    : `Set a monthly budget limit for ${highest.category}.`
            });
        }
    }

    // Investment suggestion
    const budgetLeft = income - totalSpent;
    if (budgetLeft > 5000) {
        const sipAmount = Math.min(5000, Math.floor(budgetLeft * 0.3));
        insights.push({
            type: 'success',
            icon: '📈',
            title: 'Investment Opportunity',
            message: `You have ₹${budgetLeft.toLocaleString()} left this month.`,
            suggestion: `Consider starting a SIP of ₹${sipAmount.toLocaleString()}/month in an Index Fund or ELSS for long-term wealth building.`
        });
    }

    // Emergency fund
    const emergencyFundTarget = income * 6;
    insights.push({
        type: 'info',
        icon: '💰',
        title: 'Emergency Fund Target',
        message: `Build an emergency fund of ₹${emergencyFundTarget.toLocaleString()} (6 months of income).`,
        suggestion: 'Save 10-15% of your monthly income towards this goal.'
    });

    // Savings rate check
    const savingsRate = income > 0 ? ((budgetLeft / income) * 100).toFixed(1) : 0;
    if (savingsRate < 20) {
        insights.push({
            type: 'warning',
            icon: '🎯',
            title: 'Low Savings Rate',
            message: `Your savings rate is ${savingsRate}%. Financial experts recommend saving at least 20% of your income.`,
            suggestion: 'Review your expenses and identify areas where you can cut back.'
        });
    }

    return insights;
}

// Get category statistics
exports.getCategoryStats = (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const userExpenses = db.getExpensesByUserId(userId);
        const categories = db.getAllCategories();

        const stats = categories.map(cat => {
            const categoryExpenses = userExpenses.filter(e => e.category === cat.name);
            const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);

            return {
                category: cat.name,
                emoji: cat.emoji,
                color: cat.color,
                total: total,
                count: categoryExpenses.length,
                expenses: categoryExpenses
            };
        }).filter(cat => cat.count > 0);

        res.json({
            success: true,
            stats: stats
        });

    } catch (error) {
        console.error('Category stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
