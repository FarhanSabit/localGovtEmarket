const db = require('../db/db');
const jwt = require('jsonwebtoken');


exports.getMarketLevelShopList = async (req, res) => {
    const token = req.session.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const city_id = decoded.city_id;
    const user_role =decoded.user_role;
    const market_id = decoded.market_id;

    const marketIds = req.session.marketIds;// Get marketId from query select market dropdown
    // console.log(`City ID From market Level ${city_id}`)
    try {
        if (user_role === 'admin') {

            if (marketIds){
                const MarketLevelShopListData = await new Promise((resolve, reject) => {
                    db.query('SELECT * FROM customer WHERE market_id = ?', [marketIds], (err, results) => {
                        if (err) reject(err);
                        resolve(results);
                    });
                });
               return res.render('MarketLevelShopList',{ MarketLevelShopListData });
            }
            // pass Market Level Shop List by City_id Admin
            const MarketLevelShopListData = await new Promise((resolve, reject) => {
                db.query('SELECT * FROM customer WHERE city_id = ?', [city_id], (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.render('MarketLevelShopList',{ MarketLevelShopListData });
        } else {
            const MarketLevelShopListData = await new Promise((resolve, reject) => {
                db.query('SELECT * FROM customer WHERE market_id = ?', [market_id], (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.render('MarketLevelShopList',{ MarketLevelShopListData });
        }
    } 
    catch (error) {
        console.error('Error fetching market data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
};