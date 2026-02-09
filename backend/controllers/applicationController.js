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
      // .populate("applicant", "name email phone profile skills") // ✅ skills added
      .populate("applicant", "name email phone jobseekerProfile")

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
// exports.getSingleApplicant = async (req, res) => {
//   try {
//     console.log("Requested ID:", req.params.id); // 👈 ADD

//     const application = await Application.findById(req.params.id)
//       .populate("applicant", "name email phone profile")
//       .populate("job", "title description location salary");

//     console.log("Found Application:", application); // 👈 ADD

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: "Application not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: application,
//     });
//   } catch (err) {
//     console.log("Error:", err); // 👈 ADD

//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
/* ================= GET SINGLE APPLICATION ================= */
// exports.getSingleApplicant = async (req, res) => {
//   try {
//     console.log("Requested ID:", req.params.id);

//     const application = await Application.findById(req.params.id)
//       .populate(
//         "applicant",
//         "name email phone profile jobseekerProfile about resume",
//       )
//       .populate("job", "title description location salary");

//     console.log("Found Application:", application);

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: "Application not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: application,
//     });
//   } catch (err) {
//     console.log("Error:", err);

//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
exports.getSingleApplicant = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate(
        "applicant",
        "name email phone resume dateOfBirth jobseekerProfile",
      )
      .populate("job", "title description location salary");

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
    console.log("Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
/* ================= UPDATE APPLICATION STATUS ================= */
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = [
      "pending",
      "reviewed",
      "shortlisted",
      "rejected",
      "accepted",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Only employer can update
    if (application.employer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    application.status = status;

    await application.save();

    res.json({
      success: true,
      message: "Status updated",
      data: application,
    });
  } catch (err) {
    console.log("Status Update Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
