require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/db');// Import database connection

const app = express();
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session store using MySQL
const sessionStore = new MySQLStore({}, db);

app.use(
    session({
        key: 'session_cookie_name',
        secret: process.env.SESSION_SECRET || 'default_secret_key',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            maxAge: 1000 * 60 * 60, // 1 hour
        },
    })
);

// Import and use routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const suppliersRoutes = require('./routes/suppliersRoutes');
const dummyRoutes = require('./routes/dummyRoutes');

app.use('/',authRoutes); // Handles authentication-related routes
app.use(userRoutes); // Handles user-related routes
app.use(dashboardRoutes); // Handles dashboard-related routes
app.use(suppliersRoutes); // Handles suppliers-related routes
app.use(dummyRoutes); // Handles dummy pages-related routes
/*
app.use('/', authRoutes); // Authentication routes
app.use('/users', userRoutes); // User routes
app.use('/dashboard', dashboardRoutes); // Dashboard routes
app.use('/suppliers', suppliersRoutes); // Suppliers routes
app.use('/dummy', dummyRoutes); // Dummy routes
*/
// Default route for 404 errors
app.use((req, res) => {
    res.status(404).render('404', { message: 'Page Not Found' });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


/*
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secret_key', resave: false, saveUninitialized: true }));

// Import and use route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const suppliersRoutes = require('./routes/suppliersRoutes');
const dummyRoutes = require('./routes/dummyRoutes');

app.use('/',authRoutes); // Handles authentication-related routes
app.use(userRoutes); // Handles user-related routes
app.use(dashboardRoutes); // Handles dashboard-related routes
app.use(suppliersRoutes); // Handles suppliers-related routes
app.use(dummyRoutes); // Handles dummy pages-related routes

//const PORT = 3000;
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});*/