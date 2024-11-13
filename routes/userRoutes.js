// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/user.controller.js');
const authenticateToken = require('../Middleware/authenticateToken.js');

// Multer setup for file uploads
const upload = multer({ dest: 'public/uploads/' });

// Register route
router.get('/register', userController.registerPage);
router.post('/register', userController.registerUser);

// Login route
router.get('/login', userController.loginPage);
router.post('/login', userController.loginUser);

// Logout route
router.get('/logout', userController.logoutUser);

// Index route
router.get('/index', authenticateToken, userController.indexPage);

// Users route
router.get('/users', authenticateToken, userController.usersPage);

// Add user routes
router.get('/add-user', authenticateToken, userController.addUserPage);
router.post('/add-user', authenticateToken, upload.single('photo'), userController.addUser);

// Edit user routes
router.get('/edit-user/:id', authenticateToken, userController.editUserPage);
router.post('/edit-user/:id', authenticateToken, userController.updateUser);

// Delete user route
router.get('/delete-user/:id', authenticateToken, userController.deleteUser);

// Profile route
router.get('/profile/:id', authenticateToken, userController.userProfile);

// Dummy routes
router.get('/SupplieReportPage', authenticateToken, userController.dummy1Page); // Dummy page 1
router.get('/AddSuppliers', authenticateToken, userController.dummy2Page); // Dummy page 2


module.exports = router;
