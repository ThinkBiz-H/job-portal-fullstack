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
