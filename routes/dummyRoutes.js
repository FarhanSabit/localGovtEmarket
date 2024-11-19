// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dummyController = require('../controllers/dummyController.js');
const authenticateToken = require('../Middleware/authenticateToken.js');

// Dummy routes
router.get('/GlobalMarketStockReport', authenticateToken, dummyController.GlobalMarketStockReport); // Dummy page 1
//router.get('/AddSuppliers', authenticateToken, dashboardController.dummy2Page); // Dummy page 2
// addProductCategory routes
router.get('/addProductCategory', authenticateToken, dummyController.addProductCategory);
router.get('/AllProductsReportPage', authenticateToken, dummyController.AllProductsReportPage);
router.get('/AddProducts', authenticateToken, dummyController.AddProducts);

router.get('/VehicleTypeReportPage', authenticateToken, dummyController.VehicleTypeReportPage);
router.get('/AddVehicleTypes', authenticateToken, dummyController.AddVehicleTypes);
router.get('/GateEntriesReportPage', authenticateToken, dummyController.GateEntriesReportPage);
router.get('/purchaseEntryCounterPage', authenticateToken, dummyController.purchaseEntryCounterPage);
router.get('/AddCustomerModal', authenticateToken, dummyController.AddCustomerModal);
router.get('/DeliveryEntryCounterPage', authenticateToken, dummyController.DeliveryEntryCounterPage);
router.get('/AddSupplierModal', authenticateToken, dummyController.AddSupplierModal);
router.get('/ExitEntryCounterPage', authenticateToken, dummyController.ExitEntryCounterPage);

module.exports = router;
