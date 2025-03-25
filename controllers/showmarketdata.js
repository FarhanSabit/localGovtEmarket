const db = require('../db/db');

exports.getMarketData = async (req, res) => {

    
    const marketID = req.query.marketIds;
    if (!marketID) {
        return res.status(400).json({ error: 'Market ID is required' });
    }
    try {
        const totalUsersQuery = await new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS total_users FROM users WHERE market_id = ?', [marketID], (err, results) => {
                if (err) reject(err);
                resolve(results[0].total_users);
            });
        });
        const totalSuppliersQuery = await new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS total_suppliers FROM members WHERE market_id = ?', [marketID], (err, results) => {
                if (err) reject(err);
                resolve(results[0].total_suppliers);
            });
        });
        const totalMembersQuery = await new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS total_members FROM customer WHERE market_id = ?', [marketID], (err, results) => {
                if (err) reject(err);
                resolve(results[0].total_members);
            });
        });
//total shop rents data
        const totalShopRentsQuery = await new Promise((resolve, reject) => {
            db.query('SELECT SUM(mth_pay) AS total_shoprents FROM customer WHERE market_id = ?', [marketID], (err, results) => {
                if (err) reject(err);
                resolve(results[0].total_shoprents);
            });
        });

        //total-gender-from-market
        const totalMaleQuery = await new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) AS total_male FROM customer WHERE sex = 'male' AND market_id = ?`, [marketID], (err, results) => {
                if (err) reject(err);
                resolve(results[0].total_male);
            });
        });
// console.log(`market id from ajax: ${marketID}`);
        const totalFemaleQuery = await new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) AS total_female FROM customer WHERE sex = 'female' AND market_id = ?`, [marketID], (err, results) => {
                if (err) reject(err);
                resolve(results[0].total_female);
            });
        });

        const totalUnknownGender = await new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) AS total_unknown FROM customer WHERE sex = 'null' AND market_id = ?`, [marketID], (err, results) => {
                if (err) reject(err);
                resolve(results[0].total_unknown);
            });
        });


        res.json({
            totalUsers: totalUsersQuery,
            totalSuppliers: totalSuppliersQuery,
            totalMembers: totalMembersQuery,
            total_shoprents: totalShopRentsQuery,
            //total gender
            total_male: totalMaleQuery,
            total_female: totalFemaleQuery,
            total_unknown: totalUnknownGender,
        });
    } catch (error) {
        console.error('Error fetching market data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.postMarketData = async (req, res) => {
    const {id} =  req.params;

    const users = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE market_id = ?', [id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });

    res.render('users', { users });
}