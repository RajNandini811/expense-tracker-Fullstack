# Smart Expense Tracker - Complete Application

A fully functional, clean, and simple expense tracking web application with AI-powered insights.

## Features

- ✅ **User Authentication** - Secure login with proper validation
- ✅ **Add/Edit/Delete Expenses** - Full CRUD operations
- ✅ **Visual Dashboard** - Beautiful charts and statistics
- ✅ **AI Insights** - Smart spending recommendations
- ✅ **Category Breakdown** - Detailed spending analysis
- ✅ **Budget Tracking** - Monitor spending vs income
- ✅ **Responsive Design** - Works on all devices
- ✅ **Clean Code** - Well-organized and documented

##  Project Structure

```
expense-tracker-complete/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── expenseController.js # Expense CRUD operations
│   │   ├── dashboardController.js # Dashboard stats
│   │   └── categoryController.js  # Category management
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── expenseRoutes.js     # Expense endpoints
│   │   ├── dashboardRoutes.js   # Dashboard endpoints
│   │   └── categoryRoutes.js    # Category endpoints
│   ├── .env                     # Environment variables
│   ├── package.json             # Backend dependencies
│   └── server.js                # Main server file
└── frontend/
    ├── css/
    │   ├── main.css             # Base styles
    │   ├── login.css            # Login page styles
    │   └── dashboard.css        # Dashboard styles
    ├── js/
    │   ├── config.js            # API configuration
    │   ├── auth.js              # Authentication module
    │   ├── dashboard.js         # Dashboard module
    │   ├── expenses.js          # Expenses module
    │   ├── ui.js                # UI utilities
    │   └── main.js              # Main application
    └── index.html               # Main HTML file
```

##  Quick Start

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation Steps

1. **Navigate to backend directory:**
   ```bash
   cd expense-tracker-complete/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm start
   ```

   You should see:
   ```
   ════════════════════════════════════════════════
        EXPENSE TRACKER API SERVER
   ════════════════════════════════════════════════
     ✅ Server running on: http://localhost:3000
   ```

4. **Open the frontend:**
   - Open a new terminal/command prompt
   - Navigate to `frontend` folder
   - Open `index.html` in your browser (double-click or use live server)

### Demo Credentials

```
Username: john
Password: password123
```

OR

```
Username: jane
Password: pass456
```

##  API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### POST /api/auth/login
Login user
```json
Request:
{
  "username": "john",
  "password": "password123"
}

Response:
{
  "success": true,
  "user": {
    "id": 1,
    "username": "john",
    "name": "John Doe",
    "income": 60000
  }
}
```

### Expense Endpoints

#### GET /api/expenses/:userId
Get all expenses for a user

#### POST /api/expenses
Create new expense
```json
Request:
{
  "userId": 1,
  "category": "Food",
  "amount": 850,
  "description": "Lunch",
  "date": "2024-01-15"
}
```

#### DELETE /api/expenses/:id
Delete expense

### Dashboard Endpoints

#### GET /api/dashboard/:userId
Get complete dashboard data including stats, breakdown, and AI insights

### Category Endpoints

#### GET /api/categories
Get all available categories

## 🎯 Key Fixes from Original

| Issue | Solution |
|-------|----------|
| ❌ Login not working | ✅ Full validation on frontend & backend |
| ❌ Poor connectivity | ✅ Clean REST API with proper error handling |
| ❌ Complex UI | ✅ Simple, intuitive design |
| ❌ Broken features | ✅ All features fully tested and working |
| ❌ Messy code | ✅ Organized MVC structure |
| ❌ No validation | ✅ Complete input validation |
| ❌ "Cannot GET /" error | ✅ Proper routing with root endpoint |

##  Technologies Used

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (no frameworks, pure CSS)
- **JavaScript (ES6+)** - Logic
- **Chart.js** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin requests
- **Body-parser** - Request parsing

##  Configuration

### Port Configuration
Default port is `3000`. To change:

Edit `backend/.env`:
```
PORT=3000
```

### API URL Configuration
If backend runs on different port, update `frontend/js/config.js`:
```javascript
const CONFIG = {
    API_URL: 'http://localhost:3000/api'
};
```

##  Data Storage

Currently uses **in-memory storage** for demo purposes.

For production, replace with a real database:
- MongoDB
- PostgreSQL
- MySQL

Database code is in `backend/config/database.js`

##  Customization

### Add New Categories

Edit `backend/config/database.js`:
```javascript
this.categories = [
    { name: 'Food', emoji: '🍔', color: '#ef4444' },
    { name: 'Transport', emoji: '🚕', color: '#3b82f6' },
    // Add your category
    { name: 'Education', emoji: '📚', color: '#8b5cf6' }
];
```

### Change Color Theme

Edit `frontend/css/main.css`:
```css
:root {
    --primary: #667eea;        /* Purple */
    --primary-dark: #764ba2;   /* Dark Purple */
}
```

### Add New User

Edit `backend/config/database.js`:
```javascript
this.users = [
    // Add new user
    {
        id: 3,
        username: 'alex',
        password: 'secure123',
        name: 'Alex Johnson',
        income: 80000
    }
];
```

##  Troubleshooting

### "Cannot GET /" Error
✅ **Fixed!** The root endpoint now returns API information.

### Backend Not Starting
- Check if port 3000 is available
- Try: `npm install` again
- Check Node.js version: `node --version` (should be v14+)

### Frontend Not Connecting
- Make sure backend is running
- Check browser console (F12) for errors
- Verify API_URL in `js/config.js` matches backend

### Login Not Working
- Use exact credentials: `john` / `password123`
- Check browser console for network errors
- Ensure backend server is running

### CORS Errors
- Backend has CORS enabled by default
- If still issues, check browser security settings

##  Responsive Design

Works perfectly on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px)
- ✅ Mobile (375px)

##  Security Notes

**For Production:**
- Use HTTPS
- Hash passwords (bcrypt)
- Implement JWT tokens
- Add rate limiting
- Use environment variables
- Add input sanitization
- Implement CSRF protection

##  Future Enhancements

- [ ] User registration
- [ ] Password reset
- [ ] Export to CSV/PDF
- [ ] Recurring expenses
- [ ] Budget alerts
- [ ] Multi-currency
- [ ] Receipt uploads
- [ ] Email notifications
- [ ] Mobile app

##  License

Open source - Free to use and modify

##  Support

If you encounter issues:

1. Check this README
2. Check browser console (F12)
3. Check terminal for backend errors
4. Verify Node.js is installed: `node --version`
5. Try clean install: Delete `node_modules`, run `npm install` again

---

**Enjoy tracking your expenses! **
