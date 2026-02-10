const express = require("express");
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  applyForJob,
  getMyJobs,
} = require("../controllers/jobController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// My jobs (Employer only)
router.get("/my-jobs", protect, authorize("employer"), getMyJobs);

router
  .route("/")
  .get(getJobs)
  .post(protect, authorize("employer", "admin"), createJob);

router
  .route("/:id")
  .get(getJob)
  .put(protect, authorize("employer", "admin"), updateJob)
  .delete(protect, authorize("employer", "admin"), deleteJob);

router.post("/:id/apply", protect, authorize("jobseeker"), applyForJob);

module.exports = router;
