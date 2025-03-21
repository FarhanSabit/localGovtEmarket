const jwt = require('jsonwebtoken');
const db = require('../db/db');

// Render index page with logged-in user
exports.indexPage = async (req, res) => {
    
    // Saved marketid in session
    if (req.session.marketIds) {
        req.session.marketIds = null; // Clear the session value for marketId
    }
    //saved here
    const marketIds = req.query.marketIds || req.session.marketIds;// Get marketId from query select market dropdown
    if (marketIds) {
        req.session.marketIds = marketIds; // Save marketId in session 
    }
    // end saved session

    try {
        const token = req.session.token;
        if (!token) return res.redirect('/login');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;
        const marketId = decoded.market_id;
        const userRole = decoded.user_role;
        const city_id = decoded.city_id;
        // Get user role from token
        

        const userQuery = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ? AND market_id = ?', [userId, marketId], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
        //get all the market name by city_id from markets table 
        const allmarket = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM markets WHERE city_id = ?', [city_id] ,(err, results) => {
                if (err) reject(err);
                resolve(results);
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
            const city_name_query = 'SELECT name FROM cities WHERE id = ?';

            db.query(city_name_query, [city_id], (err, results) => {
                if (err) {
                    console.error('Database query error:', err);
                    return;
                }

                if (results.length === 0) {
                    console.log('No city found with this city_id');
                } else {
                    const city_name = results[0].name;
                    marketQuery = { name: city_name };

                    console.log('Market Query:', marketQuery); 
                }
            }); // Set to "City Admin" if user is admin
        } else {
            marketQuery = await new Promise((resolve, reject) => {
                db.query('SELECT * FROM markets WHERE id = ?', [marketId], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                });
            });
        }

        // Condition to check if user is admin
        let totalUsersQuery, totalSuppliersQuery, totalMembersQuery, totalMaleQuery, totalFemaleQuery, totalUnknownGender, totalCityMaleQuery, totalCityFemaleQuery, totalCityUnknownGender  ;

        if (userRole === 'admin') {
            totalUsersQuery = await new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total_users FROM users WHERE city_id = ?', [city_id], (err, results) => {
                    // console.log(city_id);
                    if (err) reject(err);
                    resolve(results[0].total_users);
                }); 
            });

            totalSuppliersQuery = await new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total_suppliers FROM customer WHERE city_id = ?', [city_id], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_suppliers);
                });
            });

            totalMembersQuery = await new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS total_members FROM members WHERE city_id = ?', [city_id], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_members);
                });
            });


            // Total Member city Count
            // totalCityMaleQuery = await new Promise((resolve, reject) => {
            //     db.query(`SELECT COUNT(*) AS total_city_male FROM customer WHERE sex = 'male' AND city_id = ?`, [city_id], (err, results) => {
            //         if (err) reject(err);
            //         resolve(results[0].total_city_male);
            //     });
            // });

            // totalCityFemaleQuery = await new Promise((resolve, reject) => {
            //     db.query(`SELECT COUNT(*) AS total_city_female FROM customer WHERE sex = 'female' AND city_id = ?`, [city_id], (err, results) => {
            //         if (err) reject(err);
            //         resolve(results[0].total_city_female);
            //     });
            // });

            // totalCityUnknownGender = await new Promise((resolve, reject) => {
            //     db.query(`SELECT COUNT(*) AS total_city_unknown FROM customer WHERE sex = 'unknown' AND city_id = ?`, [city_id], (err, results) => {
            //         if (err) reject(err);
            //         resolve(results[0].total_city_unknown);
            //     });
            // });
            totalMaleQuery = await new Promise((resolve, reject) => {
                db.query(`SELECT COUNT(*) AS total_male FROM customer WHERE sex = 'male' AND city_id = ?`, [city_id], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_male);
                });
            });

            totalFemaleQuery = await new Promise((resolve, reject) => {
                db.query(`SELECT COUNT(*) AS total_female FROM customer WHERE sex = 'female' AND city_id = ?`, [city_id], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_female);
                });
            });

            totalUnknownGender = await new Promise((resolve, reject) => {
                db.query(`SELECT COUNT(*) AS total_unknown FROM customer WHERE sex = 'null' AND city_id = ?`, [city_id], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_unknown);
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

            // Total Member gender Count
            totalMaleQuery = await new Promise((resolve, reject) => {
                db.query(`SELECT COUNT(*) AS total_male FROM customer WHERE sex = 'male' AND market_id = ?`, [marketId], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_male);
                });
            });

            totalFemaleQuery = await new Promise((resolve, reject) => {
                db.query(`SELECT COUNT(*) AS total_female FROM customer WHERE sex = 'female' AND market_id = ?`, [marketId], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_female);
                });
            });

            totalUnknownGender = await new Promise((resolve, reject) => {
                db.query(`SELECT COUNT(*) AS total_unknown FROM customer WHERE sex = 'null' AND market_id = ?`, [marketId], (err, results) => {
                    if (err) reject(err);
                    resolve(results[0].total_unknown);
                });
            });
        }
    
        res.render('index', {
            user: userQuery,
            market: marketQuery,
            userRole: userRole,
            allmarket,
            totalUsers: totalUsersQuery,
            total_suppliers: totalSuppliersQuery,
            total_members: totalMembersQuery,
            //pass-total-gender-count-from-market
            total_male: totalMaleQuery,
            total_female: totalFemaleQuery,
            total_unknown: totalUnknownGender,
            //pass-total-gender-count-from-city
            total_city_male: totalCityMaleQuery,
            total_city_female: totalCityFemaleQuery,
            total_city_unknown: totalCityUnknownGender

            
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
