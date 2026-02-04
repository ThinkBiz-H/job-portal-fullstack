const express = require("express");

const {
  getMyApplications,
  getMyApplicants,
  getSingleApplicant, // 👈 ADD
} = require("../controllers/applicationController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Employer: All applicants
router.get(
  "/my-applicants",
  protect,
  authorize("employer", "admin"),
  getMyApplicants,
);

// Jobseeker: My applications
router.get("/me", protect, getMyApplications);

// 👇 Single Applicant Detail (IMPORTANT)
router.get("/:id", protect, authorize("employer", "admin"), getSingleApplicant);

module.exports = router;
