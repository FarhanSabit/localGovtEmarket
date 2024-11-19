// controllers/userController.js
const db = require('../db/db');

exports.customers = (req, res) => {res.render('customers');};
exports.addCustomers = (req, res) => {res.render('addCustomers');};

exports.members = (req, res) => {res.render('members');};
exports.addMembers = (req, res) => {res.render('addMembers');};
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

