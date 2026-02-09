const express = require("express");

const {
  getMyApplications,
  getMyApplicants,
  getSingleApplicant,
  updateApplicationStatus, // ✅ ADD
} = require("../controllers/applicationController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// ================= EMPLOYER: ALL APPLICANTS =================
router.get(
  "/my-applicants",
  protect,
  authorize("employer", "admin"),
  getMyApplicants,
);

// ================= JOBSEEKER: MY APPLICATIONS =================
router.get("/me", protect, getMyApplications);

// ================= SINGLE APPLICANT DETAIL =================
router.get("/:id", protect, authorize("employer", "admin"), getSingleApplicant);

// ================= UPDATE STATUS =================
router.put(
  "/:id/status",
  protect,
  authorize("employer", "admin"),
  updateApplicationStatus,
);

module.exports = router;
