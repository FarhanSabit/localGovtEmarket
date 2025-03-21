const express = require('express');
const router = express.Router();
const showmarketdata = require('../controllers/showmarketdata.js');
const authenticateToken = require('../Middleware/authenticateToken.js');


router.get('/get-market-data', authenticateToken, showmarketdata.getMarketData);
router.post('/get-market-data:id',authenticateToken, showmarketdata.postMarketData);
                                                                                                                                                                                              
module.exports = router;