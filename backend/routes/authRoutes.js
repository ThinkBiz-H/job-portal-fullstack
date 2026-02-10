const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  updateJobseekerProfile,
  updateEmployerProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// AUTH
router.post("/register", register);
router.post("/login", login);

// PROFILE
router.get("/me", protect, getMe);
router.put("/update-jobseeker-profile", protect, updateJobseekerProfile);
router.put("/updateprofile", protect, updateEmployerProfile);

module.exports = router;
