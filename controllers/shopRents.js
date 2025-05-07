const db = require('../db/db');


//Render Shop Rents
exports.renderShopRentsPage = async (req, res) => {
    const { city_id, user_role } = req.user;
    const marketIds = req.session.marketIds; //market id from ajax & its set to req.session from footer js

    try {
    if (user_role === 'admin') {
        
        if (marketIds) {
            const loadShopRentsData = await new Promise((resolve, reject) => {

                db.query('SELECT * FROM customer WHERE market_id = ?', [marketIds], (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            
            res.render('shopRents', {
                loadShopRentsDatas: loadShopRentsData,
            });
        } else {
            const loadShopRentsData = await new Promise((resolve, reject) => {

                db.query('SELECT * FROM customer WHERE city_id = ?', [city_id], (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                   
                });
            });
            res.render('shopRents', {
                loadShopRentsDatas: loadShopRentsData,
            });
        }

        
        
        
    }
    
    }catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
};




// exports.addshopRents = (req, res) => {res.render('addshopRents');};


//add shop rents 
exports.addShopRents = async (req, res) => {
    // const { city_id, user_role } = req.user;
    // const marketIds = req.session.marketIds; //market id from ajax & its set to req.session from footer js
    
    try {
        const { name, fc_no, mth_pay} = req.body;

        await new Promise((resolve, reject) => {
            db.query('INSERT INTO customer SET ?', { name, fc_no, mth_pay }, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
        // res.redirect('/shopRents');
    }catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }



  
};
