const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  updateJobseekerProfile,
  updateEmployerProfile,
  uploadResume, // ✅ ADD THIS
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // ✅ MULTER

/* ================= AUTH ================= */
router.post("/register", register);
router.post("/login", login);

/* ================= PROFILE ================= */
router.get("/me", protect, getMe);

// 🔥 RESUME UPLOAD ROUTE (MOST IMPORTANT)
router.post(
  "/upload-resume",
  protect,
  upload.single("resume"), // field name = "resume"
  uploadResume,
);

// 🔥 JOBSEEKER PROFILE UPDATE
router.put("/update-jobseeker-profile", protect, updateJobseekerProfile);

// 🔥 EMPLOYER PROFILE UPDATE
router.put("/updateprofile", protect, updateEmployerProfile);

module.exports = router;
