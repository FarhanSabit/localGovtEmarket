// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dummyController = require('../controllers/dummyController.js');
const authenticateToken = require('../Middleware/authenticateToken.js');

//user section
router.get('/customers', authenticateToken, dummyController.customers);
router.get('/addCustomers', authenticateToken, dummyController.addCustomers);

router.get('/members', authenticateToken, dummyController.members);
router.get('/addMembers', authenticateToken, dummyController.addMembers);

router.get('/Gate_Entry_Counter', authenticateToken, dummyController.Gate_Entry_Counter);

router.get('/Stock_Counter', authenticateToken, dummyController.Stock_Counter);

router.get('/Vat_Payment', authenticateToken, dummyController.Vat_Payment);
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


//dummy Stock Section Route
router.get('/allStockEntry', authenticateToken, dummyController.allStockEntry);
router.get('/purchaseStockEntry', authenticateToken, dummyController.purchaseStockEntry);
router.get('/delivaryStockEntry', authenticateToken, dummyController.delivaryStockEntry);
//router.get('/dummyWebcam', authenticateToken, dummyController.dummyWebcam);

//dummy Vat Section Route
router.get('/allVatEntries', authenticateToken, dummyController.allVatEntries);
router.get('/vatPaymentCounter', authenticateToken, dummyController.vatPaymentCounter);

//dummy Product Request Route
router.get('/productRequestList', authenticateToken, dummyController.productRequestList);
router.get('/addProductRequest', authenticateToken, dummyController.addProductRequest);

//dummy Shop Management Route
router.get('/MarketLeveListPage', authenticateToken, dummyController.MarketLeveListPage);
router.get('/AddMarketLevel', authenticateToken, dummyController.AddMarketLevel);

router.get('/MarketLevelShopList', authenticateToken, dummyController.MarketLevelShopList);
router.get('/AddLevelShops', authenticateToken, dummyController.AddLevelShops);

//dummy Member Section Route
/*router.get('/ninMember', authenticateToken, dummyController.ninMember);
router.get('/addMember', authenticateToken, dummyController.addMember);*/

router.get('/withoutNin', authenticateToken, dummyController.withoutNin);
router.get('/addWithoutNin', authenticateToken, dummyController.addWithoutNin);

router.get('/occupationType', authenticateToken, dummyController.occupationType);
router.get('/addoccupationType', authenticateToken, dummyController.addoccupationType);

router.get('/shopRents', authenticateToken, dummyController.shopRents);
router.get('/addshopRents', authenticateToken, dummyController.addshopRents);

router.get('/rentPayments', authenticateToken, dummyController.rentPayments);
router.get('/addrentPayments', authenticateToken, dummyController.addrentPayments);

module.exports = router;
