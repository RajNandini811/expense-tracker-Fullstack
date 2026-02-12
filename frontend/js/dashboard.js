// Dashboard Module
const Dashboard = {
    pieChart: null,
    dashboardData: null,

    // Load dashboard data
    async loadData(userId) {
        try {
            const response = await fetch(API.DASHBOARD.GET_DATA(userId));
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load dashboard');
            }

            if (data.success) {
                this.dashboardData = data.data;
                this.updateStats(data.data);
                this.updateCategoryBreakdown(data.data.categoryBreakdown);
                this.updateInsights(data.data.insights);
                this.updatePieChart(data.data.categoryBreakdown);
                return { success: true };
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Dashboard load error:', error);
            UI.showToast(error.message || 'Failed to load dashboard', 'error');
            return { success: false };
        }
    },

    // Update stats cards
    updateStats(data) {
        document.getElementById('totalSpent').textContent = `₹${data.totalSpent.toLocaleString()}`;
        document.getElementById('budgetLeft').textContent = `₹${data.budgetLeft.toLocaleString()}`;
        document.getElementById('savingsRate').textContent = `${data.savingsRate}%`;
        document.getElementById('monthlyIncome').textContent = `₹${data.income.toLocaleString()}`;
    },

    // Update category breakdown
    updateCategoryBreakdown(breakdown) {
        const container = document.getElementById('categoryBreakdown');

        if (!breakdown || breakdown.length === 0) {
            container.innerHTML = '<div class="no-data"><p>📊 No expenses yet</p><p class="small">Add your first expense to see breakdown</p></div>';
            return;
        }

        container.innerHTML = breakdown.map(cat => `
            <div class="category-item">
                <div class="category-emoji">${cat.emoji}</div>
                <div class="category-info">
                    <div class="category-name">${cat.category}</div>
                    <div class="category-bar">
                        <div class="category-bar-fill" style="width: ${cat.percentage}%; background: ${cat.color};"></div>
                    </div>
                    <div class="category-details">
                        ${cat.count} transaction${cat.count !== 1 ? 's' : ''} • ${cat.percentage}%
                    </div>
                </div>
                <div class="category-amount">₹${cat.amount.toLocaleString()}</div>
            </div>
        `).join('');
    },

    // Update insights
    updateInsights(insights) {
        const container = document.getElementById('insightsContainer');

        if (!insights || insights.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = insights.map(insight => `
            <div class="insight-card ${insight.type}">
                <div class="insight-header">
                    <span class="insight-icon">${insight.icon}</span>
                    <span class="insight-title">${insight.title}</span>
                </div>
                <div class="insight-message">${insight.message}</div>
                <div class="insight-suggestion">💡 ${insight.suggestion}</div>
            </div>
        `).join('');
    },

    // Update pie chart
    updatePieChart(breakdown) {
        const ctx = document.getElementById('pieChart');
        const noDataMsg = document.getElementById('noDataMessage');

        // Destroy existing chart
        if (this.pieChart) {
            this.pieChart.destroy();
            this.pieChart = null;
        }

        if (!breakdown || breakdown.length === 0) {
            ctx.style.display = 'none';
            noDataMsg.style.display = 'block';
            document.getElementById('chartLegend').innerHTML = '';
            return;
        }

        ctx.style.display = 'block';
        noDataMsg.style.display = 'none';

        const data = {
            labels: breakdown.map(cat => cat.category),
            datasets: [{
                data: breakdown.map(cat => cat.amount),
                backgroundColor: breakdown.map(cat => cat.color),
                borderWidth: 0,
                hoverOffset: 10
            }]
        };

        this.pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const percentage = breakdown[context.dataIndex].percentage;
                                return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
                            }
                        },
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: { size: 14 },
                        bodyFont: { size: 13 }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
            }
        });

        // Update legend
        const legendHTML = breakdown.map(cat => `
            <div class="legend-item">
                <div class="legend-color" style="background: ${cat.color};"></div>
                <div class="legend-label">${cat.emoji} ${cat.category}</div>
            </div>
        `).join('');

        document.getElementById('chartLegend').innerHTML = legendHTML;
    },

    // Refresh dashboard
    async refresh(userId) {
        await this.loadData(userId);
    }
};
