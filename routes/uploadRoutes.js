const express = require("express");
const router = express.Router();
const upload = require("../Middleware/fileUpload");
const { uploadController } = require("../controllers/uploadController");
const authenticateToken = require('../Middleware/authenticateToken.js');

// POST /upload
router.post("/upload", authenticateToken, upload.single("file"), uploadController);

module.exports = router;
