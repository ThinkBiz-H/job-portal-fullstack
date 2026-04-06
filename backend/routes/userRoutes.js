// const express = require("express");
// const router = express.Router();

// // Auth middleware
// const { protect } = require("../middleware/authMiddleware");

// // Multer upload middleware
// const upload = require("../middleware/upload");

// // Controller
// const { uploadResume } = require("../controllers/userController");

// /* ================= UPLOAD RESUME ================= */
// router.post("/upload-resume", protect, upload.single("resume"), uploadResume);

// module.exports = router;

const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const { uploadResume, updateProfile } = require("../controllers/userController");

/* ================= UPLOAD RESUME ================= */
router.post("/upload-resume", protect, upload.single("resume"), uploadResume);

/* ================= 🔥 ADD THIS ================= */
router.put(
  "/update-profile",
  protect,
  upload.single("resume"),
  updateProfile
);

module.exports = router;