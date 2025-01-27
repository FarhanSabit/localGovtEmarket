// routes/occupationTypeRoutes.js
const express = require('express');
const router = express.Router();
const occupationTypeController = require('../controllers/occupationTypeController.js');
const authenticateToken = require('../Middleware/authenticateToken.js');

// Occupation type routes
router.get('/occupationType', authenticateToken, occupationTypeController.occupationType);

// Add occupation type routes
router.get('/addoccupationType', authenticateToken, occupationTypeController.addoccupationTypePage);
router.post('/addOccupationType', authenticateToken, occupationTypeController.addOccupationType);

// Edit occupation type routes
router.get('/editoccupationType/:id', authenticateToken, occupationTypeController.editOccupationTypePage);
router.post('/updateOccupationType/:id', authenticateToken, occupationTypeController.updateOccupationType);

// Delete occupation type route
router.get('/deleteOccupationType/:id', authenticateToken, occupationTypeController.deleteOccupationType);

// Profile route
router.get('/occupationTypeProfile/:id', authenticateToken, occupationTypeController.occupationTypeProfile);

module.exports = router;
