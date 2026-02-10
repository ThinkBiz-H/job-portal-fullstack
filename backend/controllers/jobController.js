// const Job = require("../models/Job");
// const Application = require("../models/Application");
// const { answers } = req.body;
// /* ================= GET ALL JOBS ================= */
// exports.getJobs = async (req, res) => {
//   try {
//     let query = Job.find().populate("postedBy", "name email");

//     // Search
//     if (req.query.search) {
//       query = query.find({
//         title: { $regex: req.query.search, $options: "i" },
//       });
//     }

//     const jobs = await query.sort("-createdAt");

//     res.json({
//       success: true,
//       count: jobs.length,
//       data: jobs,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= GET SINGLE JOB ================= */
// exports.getJob = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id)
//       .populate("postedBy", "name email")
//       .populate("companyId", "name email");

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     job.totalViews++;
//     await job.save();

//     res.json({
//       success: true,
//       data: job,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= CREATE JOB ================= */
// exports.createJob = async (req, res) => {
//   try {
//     if (!["employer", "admin"].includes(req.user.userType)) {
//       return res.status(403).json({
//         success: false,
//         message: "Only employer can post jobs",
//       });
//     }

//     req.body.postedBy = req.user.id;

//     const job = await Job.create(req.body);

//     res.status(201).json({
//       success: true,
//       data: job,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= UPDATE JOB ================= */
// exports.updateJob = async (req, res) => {
//   try {
//     let job = await Job.findById(req.params.id);

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     if (
//       job.postedBy.toString() !== req.user.id &&
//       req.user.userType !== "admin"
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized",
//       });
//     }

//     job = await Job.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.json({
//       success: true,
//       data: job,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= DELETE JOB ================= */
// exports.deleteJob = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     if (
//       job.postedBy.toString() !== req.user.id &&
//       req.user.userType !== "admin"
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized",
//       });
//     }

//     await job.deleteOne();

//     res.json({
//       success: true,
//       message: "Job deleted",
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ================= APPLY FOR JOB ================= */
// // exports.applyForJob = async (req, res) => {
// //   try {
// //     if (req.user.userType !== "jobseeker") {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Only jobseekers can apply",
// //       });
// //     }

// //     const job = await Job.findById(req.params.id);

// //     if (!job) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Job not found",
// //       });
// //     }

// //     const already = await Application.findOne({
// //       job: req.params.id,
// //       applicant: req.user.id,
// //     });

// //     if (already) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Already applied",
// //       });
// //     }

// //     const application = await Application.create({
// //       job: req.params.id,
// //       applicant: req.user.id,
// //       employer: job.postedBy,
// //       coverLetter: req.body.coverLetter,
// //       resume: req.body.resume,
// //     });

// //     job.totalApplications += 1;
// //     await job.save();

// //     res.status(201).json({
// //       success: true,
// //       data: application,
// //     });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };
// /* ================= APPLY FOR JOB ================= */
// exports.applyForJob = async (req, res) => {
//   try {
//     if (req.user.userType !== "jobseeker") {
//       return res.status(403).json({
//         success: false,
//         message: "Only jobseekers can apply",
//       });
//     }

//     const job = await Job.findById(req.params.id);

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     // ✅ Check already applied
//     const already = await Application.findOne({
//       job: req.params.id,
//       applicant: req.user.id,
//     });

//     if (already) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already applied for this job",
//       });
//     }

//     // ✅ Create application
//     const application = await Application.create({
//       job: req.params.id,
//       applicant: req.user.id,
//       employer: job.postedBy,
//       coverLetter: req.body.coverLetter,
//       resume: req.body.resume,
//     });

//     // ✅ Safe count update
//     job.totalApplications = (job.totalApplications || 0) + 1;
//     await job.save();

//     // ✅ Send count to frontend
//     res.status(201).json({
//       success: true,
//       message: "Applied successfully",
//       totalApplications: job.totalApplications,
//       data: application,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// /* ================= GET MY JOBS (EMPLOYER) ================= */
// exports.getMyJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({
//       postedBy: req.user.id,
//     }).sort("-createdAt");

//     res.json({
//       success: true,
//       count: jobs.length,
//       data: jobs,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };const Job = require("../models/Job");

const Job = require("../models/Job");
const Application = require("../models/Application");
/* ================= GET ALL JOBS ================= */
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort("-createdAt");
    res.json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET SINGLE JOB ================= */
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    job.totalViews += 1;
    await job.save();

    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE JOB ================= */
exports.createJob = async (req, res) => {
  try {
    req.body.postedBy = req.user.id;
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE JOB ================= */
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE JOB ================= */
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= APPLY FOR JOB (SCREENING READY) ================= */
exports.applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    const already = await Application.findOne({
      job: job._id,
      applicant: req.user.id,
    });
    if (already)
      return res
        .status(400)
        .json({ success: false, message: "Already applied" });

    const answers = req.body.answers || [];

    for (const q of job.screeningQuestions) {
      if (q.required) {
        const found = answers.find(
          (a) => a.questionId?.toString() === q._id.toString(),
        );
        if (!found)
          return res.status(400).json({
            success: false,
            message: "All screening questions required",
          });
      }
    }

    const application = await Application.create({
      job: job._id,
      applicant: req.user.id,
      employer: job.postedBy,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter,
      answers,
    });

    job.totalApplications += 1;
    await job.save();

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET MY JOBS ================= */
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    res.json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
