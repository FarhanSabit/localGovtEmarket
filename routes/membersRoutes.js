// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const membersController = require('../controllers/membersController.js');
const authenticateToken = require('../Middleware/authenticateToken.js');

// Multer setup for file uploads
const upload = multer({ dest: '../public/uploads/' });
// suppliers routes
router.get('/ninMember', authenticateToken, membersController.ninMember);


// Add user routes
router.get('/addMember', authenticateToken, membersController.addMemberPage);
router.post('/addMember', authenticateToken,upload.single('photo'), membersController.addMember);
/*
router.get('/AddSuppliers', authenticateToken, suppliersController.addSuppliersPage);
router.post('/AddSuppliers', authenticateToken, upload.single('photo'), suppliersController.addSuppliers);

// Edit user routes
router.get('/editSuppliers/:id', authenticateToken, suppliersController.editSuppliersPage);
router.post('/editSuppliers/:id', authenticateToken, suppliersController.updateSuppliers);

// Delete user route
router.get('/deleteSuppliers/:id', authenticateToken, suppliersController.deleteSuppliers);

// Profile route
router.get('/suppliersProfile/:id', authenticateToken, suppliersController.SuppliersProfile);
*/

module.exports = router;
