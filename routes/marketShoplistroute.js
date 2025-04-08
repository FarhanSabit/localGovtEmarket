const express = require('express');
const router = express.Router();
const marketLevelShopListController = require('../controllers/marketLevelshoplist.js');
const authenticateToken = require('../Middleware/authenticateToken.js');

router.get('/MarketLevelShopList', authenticateToken, marketLevelShopListController.getMarketLevelShopList);



module.exports = router;