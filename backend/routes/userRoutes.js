const express = require("express");
const router = express.Router();

// Auth middleware
const { protect } = require("../middleware/authMiddleware");

// Multer upload middleware
const upload = require("../middleware/upload");

// Controller
const { uploadResume } = require("../controllers/userController");

/* ================= UPLOAD RESUME ================= */
router.post("/upload-resume", protect, upload.single("resume"), uploadResume);

module.exports = router;
