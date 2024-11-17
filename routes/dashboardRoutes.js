// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController.js');
const authenticateToken = require('../Middleware/authenticateToken.js');

// Dashboard routes
router.get('/index', authenticateToken, dashboardController.indexPage);

/*
// Dummy routes
router.get('/SupplieReportPage', authenticateToken, dashboardController.dummy1Page); // Dummy page 1
router.get('/AddSuppliers', authenticateToken, dashboardController.dummy2Page); // Dummy page 2
*/

module.exports = router;
