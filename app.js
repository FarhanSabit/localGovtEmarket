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

// MySQL Connection
/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'erp-bimotion'
});
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});*/
/*
// Middleware to protect routes
const authenticateToken = (req, res, next) => {
    const token = req.session.token;
    if (!token) return res.redirect('/login');
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => { //jwt_secret_key
        if (err) return res.redirect('/login');
        req.user = user;
        next();
    });
};*/
/*
// Function to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Bearer token
  
    if (!token) {
      return res.status(401).send('Access Denied: No token provided');
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).send('Invalid token');
      }
      req.user = user;
      next();
    });
  };*/

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});