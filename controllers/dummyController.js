// controllers/userController.js
const db = require('../db/db');
//dummy User Management pages
exports.customers = (req, res) => {res.render('customers');};
exports.addCustomers = (req, res) => {res.render('addCustomers');};

exports.members = (req, res) => {res.render('members');};
exports.addMembers = (req, res) => {res.render('addMembers');};

exports.Gate_Entry_Counter = (req, res) => {res.render('Gate_Entry_Counter');};

exports.Stock_Counter = (req, res) => {res.render('Stock_Counter');};

exports.Vat_Payment = (req, res) => {res.render('Vat_Payment');};
//exports.addMembers = (req, res) => {res.render('addMembers');};
// Render dummy exports.GlobalMarketStockReport = (req, res) => {res.render('GlobalMarketStockReport');};
exports.GlobalMarketStockReport = (req, res) => {res.render('GlobalMarketStockReport');};
//exports.dummy2Page = (req, res) => {res.render('AddSuppliers');};

// Render dummy exports.addProductCategory = (req, res) => {res.render('GlobalMarketStockReport');};
exports.addProductCategory = (req, res) => {res.render('addProductCategory');};

exports.AllProductsReportPage = (req, res) => {res.render('AllProductsReportPage');};
exports.AddProducts = (req, res) => {res.render('AddProducts');};

exports.VehicleTypeReportPage = (req, res) => {res.render('VehicleTypeReportPage');};
exports.AddVehicleTypes = (req, res) => {res.render('AddVehicleTypes');};
exports.GateEntriesReportPage = (req, res) => {res.render('GateEntriesReportPage');};
exports.purchaseEntryCounterPage = (req, res) => {res.render('purchaseEntryCounterPage');};
exports.AddCustomerModal = (req, res) => {res.render('AddCustomerModal');};
exports.DeliveryEntryCounterPage = (req, res) => {res.render('DeliveryEntryCounterPage');};
exports.AddSupplierModal = (req, res) => {res.render('AddSupplierModal');};
exports.ExitEntryCounterPage = (req, res) => {res.render('ExitEntryCounterPage');};


//dummy Stock Section Controller
exports.allStockEntry = (req, res) => {res.render('allStockEntry');};
exports.purchaseStockEntry = (req, res) => {res.render('purchaseStockEntry');};
exports.delivaryStockEntry = (req, res) => {res.render('delivaryStockEntry');};
//exports.dummyWebcam = (req, res) => {res.render('dummyWebcam');};

//dummy Vat Section Controller
exports.allVatEntries = (req, res) => {res.render('allVatEntries');};
exports.vatPaymentCounter = (req, res) => {res.render('vatPaymentCounter');};

//dummy Product Request Controller
exports.productRequestList = (req, res) => {res.render('productRequestList');};
exports.addProductRequest = (req, res) => {res.render('addProductRequest');};

//dummy Shop manage Controller
exports.MarketLeveListPage = (req, res) => {res.render('MarketLeveListPage');};
exports.AddMarketLevel = (req, res) => {res.render('AddMarketLevel');};

exports.MarketLevelShopList = (req, res) => {res.render('MarketLevelShopList');};
exports.AddLevelShops = (req, res) => {res.render('AddLevelShops');};

//dummy Member Section Controller
/*
exports.ninMember = (req, res) => {res.render('ninMember');};
exports.addMember = (req, res) => {res.render('addMember');};
*/
exports.withoutNin = (req, res) => {res.render('withoutNin');};
exports.addWithoutNin = (req, res) => {res.render('addWithoutNin');};

exports.occupationType = (req, res) => {res.render('occupationType');};
exports.addoccupationType = (req, res) => {res.render('addoccupationType');};

exports.shopRents = (req, res) => {res.render('shopRents');};
exports.addshopRents = (req, res) => {res.render('addshopRents');};

exports.rentPayments = (req, res) => {res.render('rentPayments');};
exports.addrentPayments = (req, res) => {res.render('addrentPayments');};
