const express = require('express');
const router = express.Router();
const shopRents = require('../controllers/shopRents.js');
const authenticateToken = require('../Middleware/authenticateToken.js');


router.get('/showshoprents', authenticateToken, shopRents.showshoprents);
// router.post('/get-market-data:id',authenticateToken, shopRents.postMarketData);
                                                                                                                                                                                              
module.exports = router;