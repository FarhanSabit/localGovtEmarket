const express = require("express");
const router = express.Router();
const upload = require("../Middleware/fileUpload");
const { uploadController } = require("../controllers/uploadController");

// POST /upload
router.post("/upload", upload.single("file"), uploadController);

module.exports = router;
