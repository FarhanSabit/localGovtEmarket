// db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',      // replace with your host
    user: 'root',           // replace with your MySQL username
    password: '',           // replace with your MySQL password
    database: 'erp-bimotion' // replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db;
