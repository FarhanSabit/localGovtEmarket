const db = require('../db/db');
const jwt = require('jsonwebtoken');
exports.getMarketLevelShopList = async (req, res) => {
    const token = req.session.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const city_id = decoded.city_id;
    const user_role =decoded.user_role;
    
    // console.log(`City ID From market Level ${city_id}`)

    if (user_role === 'admin') {
        const MarketLevelShopListData = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM customer WHERE city_id = ?', [city_id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
        res.render('MarketLevelShopList',{ MarketLevelShopListData });
    }
    
    

    
};