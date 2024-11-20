require('dotenv').config();
const mysql = require('mysql');

// Database connection configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10, // Limit connections in the pool
};

// MySQL connection pooling
const db = mysql.createPool(dbConfig);

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit the application on failure
    }
    if (connection) connection.release(); // Release the connection back to the pool
    console.log('Connected to MySQL database.');
});

// Export the database pool for use in other modules
module.exports = db;


/*
require('dotenv').config();
const mysql = require('mysql');

let db;

try {
    // Create a connection to the database using environment variables
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    // Connect to the database
    db.connect((err) => {
        if (err) {
            throw new Error('Database connection failed: ' + err.message);
        }
        console.log('Connected to MySQL database.');
    });
} catch (error) {
    console.error('Error initializing database:', error.message);
    process.exit(1); // Exit the application if database connection fails
}

// Export the database connection for use in other files
module.exports = db;*/
