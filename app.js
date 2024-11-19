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


/*// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);*/
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
});