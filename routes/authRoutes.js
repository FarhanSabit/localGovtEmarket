// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// Auth routes
router.get('/register', authController .registerPage);
router.post('/register', authController .registerUser);

router.get('/login', authController .loginPage);
router.post('/login', authController .loginUser);

router.get('/logout', authController .logoutUser);

module.exports = router;
