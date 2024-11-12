// db.js
require('dotenv').config();
const mysql = require('mysql');

/*const db = mysql.createConnection({
    host: 'localhost',      // replace with your host
    user: 'root',           // replace with your MySQL username
    password: '',           // replace with your MySQL password
    database: 'erp-bimotion' // replace with your database name*/
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db;
