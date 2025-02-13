const jwt = require('jsonwebtoken');
const db = require('../db/db');

// Render index page with logged-in user
exports.indexPage = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) return res.redirect('/login');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;
        const marketId = decoded.market_id;
        const userRole = decoded.user_role; // Get user role from token
        //console.log('User Role:', userRole);

        const userQuery = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ? AND market_id = ?', [userId, marketId], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });

        /*
        const marketQuery = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM markets WHERE id = ?', [marketId], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
        */
        let marketQuery;
        if (userRole === 'admin') {
            marketQuery = { name: "City Admin" }; // Set to "City Admin" if user is admin
        } else {
            marketQuery = await new Promise((resolve, reject) => {
                db.query('SELECT * FROM markets WHERE id = ?', [marketId], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                });
            });
        }

        // Condition to check if user is admin
        let totalUsersQuery, totalSuppliersQuery, totalMembersQuery;

        if (userRole === 'admin') {
            totalUsersQuery = await new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total_users FROM users', (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_users);
                });
            });

            totalSuppliersQuery = await new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total_suppliers FROM customer', (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_suppliers);
                });
            });

            totalMembersQuery = await new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total_members FROM members', (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_members);
                });
            });
        } else {
            totalUsersQuery = await new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total_users FROM users WHERE market_id = ?', [marketId], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_users);
                });
            });

            totalSuppliersQuery = await new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total_suppliers FROM customer WHERE market_id = ?', [marketId], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_suppliers);
                });
            });

            totalMembersQuery = await new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total_members FROM members WHERE market_id = ?', [marketId], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_members);
                });
            });
        }

        res.render('index', { 
            user: userQuery, 
            market: marketQuery, 
            totalUsers: totalUsersQuery, 
            total_suppliers: totalSuppliersQuery, 
            total_members: totalMembersQuery 
        });
    } catch (error) {
        console.error('Error rendering index page:', error);
        res.status(500).send('Error rendering index page');
    }
};

/*
// Dummy pages
exports.dummy1Page = (req, res) => res.render('SupplieReportPage', { message: 'Welcome to Dummy Page 1!' });
exports.dummy2Page = (req, res) => res.render('AddSuppliers', { message: 'Welcome to Dummy Page 2!' });
*/

/*
// Dummy pages
exports.dummy1Page = (req, res) => res.render('SupplieReportPage', { message: 'Welcome to Dummy Page 1!' });
exports.dummy2Page = (req, res) => res.render('AddSuppliers', { message: 'Welcome to Dummy Page 2!' });
*/

/*const jwt = require('jsonwebtoken');
const db = require('../db/db');

// Render index page with logged-in user
exports.indexPage = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) return res.redirect('/login');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;
        const marketId = decoded.market_id;

        const userQuery = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ? AND market_id = ?', [userId, marketId], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });

        const marketQuery = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM markets WHERE id = ?', [marketId], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });

        const totalUsersQuery = await new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS total_users FROM users WHERE market_id = ?', [marketId], (err, results) => {
                if (err) reject(err);
                resolve(results[0].total_users);
            });
        });

        const totalSuppliersQuery = await new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS total_suppliers FROM customer WHERE market_id = ?', [marketId], (err, results) => {
                if (err) reject(err);
                resolve(results[0].total_suppliers);
            });
        });

        const totalMembersQuery = await new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS total_members FROM members WHERE market_id = ?', [marketId], (err, results) => {
                if (err) reject(err);
                resolve(results[0].total_members);
            });
        });

        res.render('index', { user: userQuery, market: marketQuery, totalUsers: totalUsersQuery, total_suppliers: totalSuppliersQuery, total_members: totalMembersQuery });
    } catch (error) {
        console.error('Error rendering index page:', error);
        res.status(500).send('Error rendering index page');
    }
};
*/
/*
// Dummy pages
exports.dummy1Page = (req, res) => res.render('SupplieReportPage', { message: 'Welcome to Dummy Page 1!' });
exports.dummy2Page = (req, res) => res.render('AddSuppliers', { message: 'Welcome to Dummy Page 2!' });
*/
