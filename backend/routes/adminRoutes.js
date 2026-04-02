const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🔥 NOTE:
// Abhi ke liye protect/authorize hata diya hai
// kyuki tu fake admin token use kar raha hai
// baad me secure kar denge

/* ================= GET ALL EMPLOYERS ================= */
router.get("/employers", async (req, res) => {
  try {
    const users = await User.find({ userType: "employer" });

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.error("Admin Employers Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ================= APPROVE ================= */
router.put("/approve/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      "employerProfile.verificationStatus": "approved",
    });

    res.json({
      success: true,
      message: "Employer Approved",
    });
  } catch (err) {
    console.error("Approve Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ================= REJECT ================= */
router.put("/reject/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      "employerProfile.verificationStatus": "rejected",
    });

    res.json({
      success: true,
      message: "Employer Rejected",
    });
  } catch (err) {
    console.error("Reject Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
