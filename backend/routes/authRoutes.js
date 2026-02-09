const express = require("express");
const router = express.Router();

const {
  register,
  login,
  sendOTP,
  verifyOTP,
  getMe,
  updateJobseekerProfile,
  updateEmployerProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// AUTH
router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

// PROFILE
router.get("/me", protect, getMe);
router.put("/update-jobseeker-profile", protect, updateJobseekerProfile);
router.put("/updateprofile", protect, updateEmployerProfile);

module.exports = router;
