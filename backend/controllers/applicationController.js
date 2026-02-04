const Application = require("../models/Application");
const mongoose = require("mongoose"); // ✅ ADD

/* ================= GET MY APPLICATIONS (JOBSEEKER) ================= */
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    })
      .populate("job")
      .sort("-createdAt");

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (err) {
    console.log("GetMyApplications Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET MY APPLICANTS (EMPLOYER) ================= */
exports.getMyApplicants = async (req, res) => {
  try {
    const applications = await Application.find({
      employer: req.user.id,
    })
      .populate("applicant", "name email phone profile")
      .populate("job", "title location");

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (err) {
    console.log("GetMyApplicants Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET SINGLE APPLICATION ================= */
exports.getSingleApplicant = async (req, res) => {
  try {
    console.log("Requested ID:", req.params.id); // 👈 ADD

    const application = await Application.findById(req.params.id)
      .populate("applicant", "name email phone profile")
      .populate("job", "title description location salary");

    console.log("Found Application:", application); // 👈 ADD

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (err) {
    console.log("Error:", err); // 👈 ADD

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
