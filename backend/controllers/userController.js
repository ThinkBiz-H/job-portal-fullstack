const User = require("../models/User");
const path = require("path");
const fs = require("fs");

/* ================= UPLOAD RESUME ================= */
exports.uploadResume = async (req, res) => {
  try {
    // No file check
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Find user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete old resume (optional)
    if (user.resume) {
      const oldPath = path.join(__dirname, "../uploads/resumes", user.resume);

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Save new resume filename
    user.resume = req.file.filename;

    await user.save();

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      resume: req.file.filename,
      url: `/uploads/resumes/${req.file.filename}`,
    });
  } catch (err) {
    console.log("Resume Upload Error:", err);

    res.status(500).json({
      success: false,
      message: "Resume upload failed",
    });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ BASIC
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.location = req.body.location || user.location;
    user.gender = req.body.gender || user.gender;
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;

    // 🔥🔥 MAIN FIX
    if (req.body.skills) {
      user.jobseekerProfile.skills = Array.isArray(req.body.skills)
        ? req.body.skills.map((s) => (typeof s === "string" ? { name: s } : s))
        : [];
    }

    // ✅ ADD THESE (important)
    if (req.body.experience) {
      user.jobseekerProfile.experience = req.body.experience;
    }

    if (req.body.educationDetails) {
      user.jobseekerProfile.educationDetails = req.body.educationDetails;
    }

    if (req.body.certifications) {
      user.jobseekerProfile.certifications = req.body.certifications;
    }

    if (req.body.languages) {
      user.jobseekerProfile.languages = req.body.languages;
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated ✅",
      data: user,
    });
  } catch (err) {
    console.log("🔥 ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: err.message, // 👈 important
    });
  }
};
