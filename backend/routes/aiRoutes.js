const express = require("express");
const router = express.Router();

const {
  generateSummary,
  getATSScore,
  improveResume,
  generateProjectPoints, // 🔥 ye add kar
} = require("../controllers/aiController");

router.post("/summary", generateSummary);
router.post("/ats", getATSScore);
router.post("/improve", improveResume);
router.post("/project-points", generateProjectPoints);

module.exports = router;
