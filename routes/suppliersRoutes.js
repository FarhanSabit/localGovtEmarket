// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const suppliersController = require('../controllers/suppliersController.js');
const authenticateToken = require('../Middleware/authenticateToken.js');

// Multer setup for file uploads
const upload = multer({ dest: 'public/uploads/' });
// suppliers routes
router.get('/SupplieReportPage', authenticateToken, suppliersController.suppliersPage);

// Add user routes
router.get('/AddSuppliers', authenticateToken, suppliersController.addSuppliersPage);
router.post('/AddSuppliers', authenticateToken, upload.single('photo'), suppliersController.addSuppliers);
/*
// Edit user routes
router.get('/edit-user/:id', authenticateToken, suppliersController.editUserPage);
router.post('/edit-user/:id', authenticateToken, suppliersController.updateUser);

// Delete user route
router.get('/delete-user/:id', authenticateToken, suppliersController.deleteUser);

// Profile route
router.get('/profile/:id', authenticateToken, suppliersController.userProfile);

*/
module.exports = router;
