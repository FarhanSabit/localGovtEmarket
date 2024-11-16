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


// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

//const PORT = 3000;
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});