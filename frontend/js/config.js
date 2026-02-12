// API Configuration
const CONFIG = {
    API_URL: 'http://localhost:3000/api',
    STORAGE_KEY: 'expense_tracker_user',
    DATE_FORMAT: {
        locale: 'en-US',
        options: { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        }
    }
};

// API Endpoints
const API = {
    AUTH: {
        LOGIN: `${CONFIG.API_URL}/auth/login`,
        REGISTER: `${CONFIG.API_URL}/auth/register`,
        GET_USER: (userId) => `${CONFIG.API_URL}/auth/user/${userId}`
    },
    EXPENSES: {
        GET_ALL: (userId) => `${CONFIG.API_URL}/expenses/${userId}`,
        GET_SINGLE: (id) => `${CONFIG.API_URL}/expenses/single/${id}`,
        CREATE: `${CONFIG.API_URL}/expenses`,
        UPDATE: (id) => `${CONFIG.API_URL}/expenses/${id}`,
        DELETE: (id) => `${CONFIG.API_URL}/expenses/${id}`
    },
    DASHBOARD: {
        GET_DATA: (userId) => `${CONFIG.API_URL}/dashboard/${userId}`,
        GET_CATEGORY_STATS: (userId) => `${CONFIG.API_URL}/dashboard/categories/${userId}`
    },
    CATEGORIES: {
        GET_ALL: `${CONFIG.API_URL}/categories`,
        GET_SINGLE: (name) => `${CONFIG.API_URL}/categories/${name}`
    }
};
