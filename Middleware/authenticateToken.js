const jwt = require('jsonwebtoken');
const db = require('../db/db');

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.session.token;
        

        if (!token) {
            console.error('No token provided. Redirecting to login.');
            return res.redirect('/login'); // Redirect if no token found
        }

        const user = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    reject(err); // Reject promise if verification fails
                } else {
                    resolve(decoded); // Resolve promise with decoded user info
                }
            });
        });

        req.user = user; // Attach user info to the request object
        

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const marketId = decoded.market_id;
        // const city_id = decoded.city_id;
        const marketh = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM markets WHERE id = ?', [marketId], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Get first row
            });
        });
        // const allmarketh = await new Promise((resolve, reject) => {
        //     db.query('SELECT * FROM markets WHERE city_id = ?', [city_id] ,(err, results) => {
        //         if (err) reject(err);
        //         resolve(results);
        //     });
        // });
        const marketIds = req.query.marketIds || req.session.marketIds;
        // Get marketId from query select market dropdown
        // console.log('sdfsfsdf:', marketID);
        const showCurrentMarketName = await new Promise((resolve, reject) => {
            db.query('SELECT name FROM markets WHERE id = ?', [marketIds], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
        res.locals.showCurrentMarketName = showCurrentMarketName;
        res.locals.userRole = user.user_role;
        res.locals.marketh = marketh;
        // console.log('showCurrentMarketName:', showCurrentMarketName);
        
        // res.locals.allmarketh = allmarketh;

        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error('Error authenticating token:', error.message);
        res.redirect('/login'); // Redirect to login if token is invalid or an error occurs
    }
};

module.exports = authenticateToken;
