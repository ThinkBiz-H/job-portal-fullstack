// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const Job = require("../models/Job");
// const Application = require("../models/Application");
// const User = require("../models/User");

// // ✅ Check if user is employer
// const isEmployer = (req, res, next) => {
//   if (req.user && req.user.userType === "employer") {
//     next();
//   } else {
//     return res.status(403).json({
//       success: false,
//       message: "Access denied. Employers only.",
//     });
//   }
// };

// // ✅ Apply middleware to all routes
// router.use(protect);
// router.use(isEmployer);

// // ====================
// // 📊 DASHBOARD ROUTES
// // ====================

// // 1. Get dashboard stats
// router.get("/stats", async (req, res) => {
//   try {
//     const employerId = req.user._id;

//     const [
//       totalJobs,
//       activeJobs,
//       totalApplications,
//       interviews,
//       pendingReviews,
//       hired,
//       rejected,
//       jobs,
//     ] = await Promise.all([
//       Job.countDocuments({ employer: employerId }),
//       Job.countDocuments({ employer: employerId, status: "active" }),
//       Application.countDocuments({ employer: employerId }),
//       Application.countDocuments({ employer: employerId, status: "interview" }),
//       Application.countDocuments({ employer: employerId, status: "applied" }),
//       Application.countDocuments({ employer: employerId, status: "accepted" }),
//       Application.countDocuments({ employer: employerId, status: "rejected" }),
//       Job.find({ employer: employerId }).select("views"),
//     ]);

//     const totalViews = jobs.reduce((sum, job) => sum + (job.views || 0), 0);
//     const conversionRate =
//       totalApplications > 0
//         ? Math.round((hired / totalApplications) * 100) + "%"
//         : "0%";
//     const interviewRate =
//       totalApplications > 0
//         ? Math.round((interviews / totalApplications) * 100) + "%"
//         : "0%";

//     res.json({
//       totalJobs,
//       activeJobs,
//       applications: totalApplications,
//       interviews,
//       pendingReviews,
//       conversionRate,
//       totalViews,
//       avgResponseTime: "2.4 days",
//       hired,
//       rejected,
//       interviewRate,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 2. Get company profile
// router.get("/company", async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select(
//       "employerProfile email phone name",
//     );

//     res.json({
//       name: user.employerProfile?.companyName || user.name || "Your Company",
//       email: user.email || "",
//       phone: user.phone || "",
//       website: user.employerProfile?.website || "",
//       industry: user.employerProfile?.industry || "",
//       size: user.employerProfile?.companySize || "",
//       founded: user.employerProfile?.foundedYear || "",
//       logo: user.employerProfile?.logo || "/company-logo.png",
//       rating: 4.8,
//       verified: user.employerProfile?.isVerified || false,
//       social: {
//         linkedin: user.employerProfile?.linkedin || "",
//         twitter: user.employerProfile?.twitter || "",
//         facebook: user.employerProfile?.facebook || "",
//         instagram: user.employerProfile?.instagram || "",
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 3. Get performance metrics
// router.get("/performance", async (req, res) => {
//   try {
//     res.json({
//       metrics: [
//         { label: "Job Views", value: "2,890", change: "+12.5%", trend: "up" },
//         { label: "Applications", value: "532", change: "+8.3%", trend: "up" },
//         {
//           label: "Avg. Response Time",
//           value: "2.4 days",
//           change: "-0.8 days",
//           trend: "up",
//         },
//         {
//           label: "Interview Rate",
//           value: "8.8%",
//           change: "+2.1%",
//           trend: "up",
//         },
//       ],
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 4. Get employer jobs
// router.get("/jobs", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 10;
//     const employerId = req.user._id;

//     const jobs = await Job.find({ employer: employerId })
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .lean();

//     // Add applicant count for each job
//     const jobsWithApplicants = await Promise.all(
//       jobs.map(async (job) => {
//         const applicantsCount = await Application.countDocuments({
//           job: job._id,
//         });
//         return {
//           ...job,
//           id: job._id,
//           applicants: applicantsCount,
//           salary: job.salary || "Not specified",
//           type: job.jobType || "Full-time",
//           urgent: job.isUrgent || false,
//           date: job.createdAt.toISOString().split("T")[0],
//           location: job.location || "Remote",
//         };
//       }),
//     );

//     res.json({
//       jobs: jobsWithApplicants,
//       total: jobs.length,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 5. Get recent activities
// router.get("/activities", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 5;
//     const employerId = req.user._id;

//     const applications = await Application.find({ employer: employerId })
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .populate("job", "title")
//       .populate("user", "name")
//       .lean();

//     const activities = applications.map((app, index) => ({
//       id: app._id || `app-${index}`,
//       text: `New application received for ${app.job?.title || "a job"}`,
//       time: formatTimeAgo(app.createdAt),
//       type: "application",
//       user: app.user?.name || "Applicant",
//       read: false,
//     }));

//     // Add sample activities if no real data
//     if (activities.length === 0) {
//       activities.push({
//         id: 1,
//         text: "Welcome to your dashboard!",
//         time: "Just now",
//         type: "system",
//         user: "System",
//         read: true,
//       });
//     }

//     res.json({
//       activities,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 6. Get recent applicants
// router.get("/applicants", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 10;
//     const employerId = req.user._id;

//     const applicants = await Application.find({ employer: employerId })
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .populate("user", "name email profileImage")
//       .populate("job", "title")
//       .lean();

//     const formattedApplicants = applicants.map((app) => ({
//       id: app._id,
//       name: app.user?.name || "Applicant",
//       email: app.user?.email || "",
//       jobTitle: app.job?.title || "Job",
//       status: app.status || "applied",
//       appliedDate: app.createdAt,
//       resume: app.resume || "",
//       profileImage: app.user?.profileImage || "/images/default-avatar.png",
//     }));

//     res.json({
//       applicants: formattedApplicants,
//       total: applicants.length,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // ====================
// // 🛠️ JOB MANAGEMENT
// // ====================

// // 7. Create new job
// router.post("/jobs", async (req, res) => {
//   try {
//     const jobData = {
//       ...req.body,
//       employer: req.user._id,
//       company:
//         req.user.employerProfile?.companyName ||
//         req.user.name ||
//         "Your Company",
//     };

//     const job = await Job.create(jobData);

//     // Update user's total jobs count
//     await User.findByIdAndUpdate(req.user._id, {
//       $inc: { "employerProfile.totalJobsPosted": 1 },
//     });

//     res.status(201).json({
//       success: true,
//       data: job,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // 8. Update job status
// router.patch("/jobs/:id/status", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const job = await Job.findOneAndUpdate(
//       { _id: id, employer: req.user._id },
//       { status },
//       { new: true },
//     );

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: job,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // 9. Delete job
// router.delete("/jobs/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const job = await Job.findOneAndDelete({
//       _id: id,
//       employer: req.user._id,
//     });

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Job deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // ====================
// // 👥 APPLICANT MANAGEMENT
// // ====================

// // 10. Update applicant status
// router.patch("/applicants/:id/status", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const application = await Application.findOneAndUpdate(
//       { _id: id, employer: req.user._id },
//       { status },
//       { new: true },
//     );

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
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // ====================
// // 🆕 EXTRA: Get single job details
// // ====================

// router.get("/jobs/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const job = await Job.findOne({
//       _id: id,
//       employer: req.user._id,
//     }).lean();

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     // Get applicants for this job
//     const applicants = await Application.find({ job: id })
//       .populate("user", "name email profileImage resume")
//       .lean();

//     res.json({
//       success: true,
//       data: {
//         ...job,
//         applicants,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // ====================
// // ⏰ HELPER FUNCTION
// // ====================

// function formatTimeAgo(date) {
//   if (!date) return "Recently";

//   const diff = Date.now() - new Date(date).getTime();
//   const minutes = Math.floor(diff / 60000);
//   const hours = Math.floor(diff / 3600000);
//   const days = Math.floor(diff / 86400000);

//   if (minutes < 1) return "Just now";
//   if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
//   if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//   if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

//   return new Date(date).toLocaleDateString();
// }

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");
// const Job = require("../models/Job");
// const Application = require("../models/Application");
// const User = require("../models/User");

// /* ===========================
//    EMPLOYER AUTH CHECK
// =========================== */
// const isEmployer = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: "Authentication required",
//     });
//   }

//   if (req.user.userType !== "employer") {
//     return res.status(403).json({
//       success: false,
//       message: "Employers only",
//     });
//   }

//   next();
// };

// /* ===========================
//    APPLY SECURITY
// =========================== */
// router.use(protect);
// router.use(isEmployer);

// /* ===========================
//    DEBUG (OPTIONAL)
// =========================== */
// router.use((req, res, next) => {
//   console.log("🔍 [EMPLOYER]", req.method, req.path, "USER:", req.user._id);
//   next();
// });

// /* ===========================
//    DASHBOARD STATS
// =========================== */
// router.get("/stats", async (req, res) => {
//   try {
//     const employerId = req.user._id;

//     const [
//       totalJobs,
//       activeJobs,
//       applications,
//       interviews,
//       pendingReviews,
//       hired,
//       rejected,
//     ] = await Promise.all([
//       Job.countDocuments({ employer: employerId }),
//       Job.countDocuments({ employer: employerId, status: "active" }),
//       Application.countDocuments({ employer: employerId }),
//       Application.countDocuments({
//         employer: employerId,
//         status: "interview",
//       }),
//       Application.countDocuments({
//         employer: employerId,
//         status: "applied",
//       }),
//       Application.countDocuments({
//         employer: employerId,
//         status: "accepted",
//       }),
//       Application.countDocuments({
//         employer: employerId,
//         status: "rejected",
//       }),
//     ]);

//     const jobs = await Job.find({ employer: employerId }).select("views");

//     const totalViews = jobs.reduce((sum, j) => sum + (j.views || 0), 0);

//     const conversionRate =
//       applications > 0 ? Math.round((hired / applications) * 100) + "%" : "0%";

//     const interviewRate =
//       applications > 0
//         ? Math.round((interviews / applications) * 100) + "%"
//         : "0%";

//     res.json({
//       success: true,
//       data: {
//         totalJobs,
//         activeJobs,
//         applications,
//         interviews,
//         pendingReviews,
//         conversionRate,
//         totalViews,
//         avgResponseTime: "2.4 days",
//         hired,
//         rejected,
//         interviewRate,
//       },
//     });
//   } catch (err) {
//     console.error("Stats Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Failed to load stats",
//     });
//   }
// });

// /* ===========================
//    COMPANY PROFILE
// =========================== */
// router.get("/company", async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select(
//       "name email phone employerProfile",
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: {
//         companyName:
//           user.employerProfile?.companyName || user.name || "Company",

//         email: user.email || "",
//         phone: user.phone || "",

//         website: user.employerProfile?.website || "",
//         industry: user.employerProfile?.industry || "",
//         companySize: user.employerProfile?.companySize || "",
//         foundedYear: user.employerProfile?.foundedYear || "",

//         logo: user.employerProfile?.logo || "",
//         coverPhoto: user.employerProfile?.coverPhoto || "",

//         verified: user.employerProfile?.isVerified || false,

//         social: {
//           linkedin: user.employerProfile?.linkedin || "",
//           twitter: user.employerProfile?.twitter || "",
//           facebook: user.employerProfile?.facebook || "",
//           instagram: user.employerProfile?.instagram || "",
//         },
//       },
//     });
//   } catch (err) {
//     console.error("Company Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Failed to load company profile",
//     });
//   }
// });

// /* ===========================
//    RECENT JOBS
// =========================== */
// router.get("/jobs", async (req, res) => {
//   try {
//     const limit = Number(req.query.limit) || 5;

//     const jobs = await Job.find({
//       employer: req.user._id,
//     })
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .lean();

//     const jobsWithApplicants = await Promise.all(
//       jobs.map(async (job) => {
//         const count = await Application.countDocuments({
//           job: job._id,
//         });

//         return {
//           ...job,
//           id: job._id,
//           applicants: count,
//           salary: job.salary || "Not specified",
//           type: job.jobType || "Full-time",
//           urgent: job.isUrgent || false,
//           status: job.status || "active",
//           location: job.location || "Remote",
//           date: job.createdAt.toISOString().split("T")[0],
//         };
//       }),
//     );

//     res.json({
//       success: true,
//       data: {
//         jobs: jobsWithApplicants,
//       },
//     });
//   } catch (err) {
//     console.error("Jobs Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Failed to load jobs",
//     });
//   }
// });

// /* ===========================
//    RECENT ACTIVITIES
// =========================== */
// router.get("/activities", async (req, res) => {
//   try {
//     const limit = Number(req.query.limit) || 5;

//     const apps = await Application.find({
//       employer: req.user._id,
//     })
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .populate("job", "title")
//       .populate("user", "name")
//       .lean();

//     let activities = apps.map((app) => ({
//       id: app._id,
//       text: `New application for ${app.job?.title || "job"}`,
//       time: timeAgo(app.createdAt),
//       type: "application",
//       user: app.user?.name || "Applicant",
//       read: false,
//     }));

//     if (!activities.length) {
//       activities = [
//         {
//           id: 1,
//           text: "Welcome to Employer Dashboard 🎉",
//           time: "Just now",
//           type: "system",
//           user: "System",
//           read: true,
//         },
//       ];
//     }

//     res.json({
//       success: true,
//       data: { activities },
//     });
//   } catch (err) {
//     console.error("Activity Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Failed to load activities",
//     });
//   }
// });

// /* ===========================
//    CREATE JOB
// =========================== */
// router.post("/jobs", async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     const company =
//       user?.employerProfile?.companyName || user?.name || "Company";

//     const job = await Job.create({
//       ...req.body,
//       employer: req.user._id,
//       company,
//       status: "active",
//     });

//     await User.findByIdAndUpdate(req.user._id, {
//       $inc: { "employerProfile.totalJobsPosted": 1 },
//     });

//     res.status(201).json({
//       success: true,
//       message: "Job created",
//       data: job,
//     });
//   } catch (err) {
//     console.error("Create Job Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Job create failed",
//     });
//   }
// });

// /* ===========================
//    UPDATE PROFILE
// =========================== */
// router.put("/profile", async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         employerProfile: req.body,
//       },
//       { new: true },
//     ).select("name email phone employerProfile");

//     res.json({
//       success: true,
//       message: "Profile updated",
//       data: user,
//     });
//   } catch (err) {
//     console.error("Profile Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Profile update failed",
//     });
//   }
// });

// /* ===========================
//    HELPER
// =========================== */
// function timeAgo(date) {
//   const diff = Date.now() - new Date(date);

//   const min = Math.floor(diff / 60000);
//   const hr = Math.floor(diff / 3600000);
//   const day = Math.floor(diff / 86400000);

//   if (min < 1) return "Just now";
//   if (min < 60) return `${min} min ago`;
//   if (hr < 24) return `${hr} hrs ago`;
//   if (day < 7) return `${day} days ago`;

//   return new Date(date).toLocaleDateString("en-IN");
// }

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const { protect, authorize } = require("../middleware/authMiddleware");

// const Job = require("../models/Job");
// const Application = require("../models/Application");
// const User = require("../models/User");

// /* ================================
//    ✅ GET EMPLOYER STATS
// ================================ */
// router.get("/stats", protect, authorize("employer"), async (req, res) => {
//   try {
//     const employerId = req.user._id;

//     const totalJobs = await Job.countDocuments({ employer: employerId });

//     const activeJobs = await Job.countDocuments({
//       employer: employerId,
//       status: "active",
//     });

//     const applications = await Application.countDocuments({
//       employer: employerId,
//     });

//     const pendingReviews = await Application.countDocuments({
//       employer: employerId,
//       status: "pending",
//     });

//     const conversionRate =
//       applications > 0
//         ? ((activeJobs / applications) * 100).toFixed(1) + "%"
//         : "0%";

//     res.json({
//       success: true,
//       data: {
//         totalJobs,
//         activeJobs,
//         applications,
//         pendingReviews,
//         conversionRate,
//       },
//     });
//   } catch (err) {
//     console.log("Stats Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Stats fetch failed",
//     });
//   }
// });

// /* ================================
//    ✅ GET EMPLOYER JOBS
// ================================ */
// router.get("/jobs", protect, authorize("employer"), async (req, res) => {
//   try {
//     const employerId = req.user._id;

//     const limit = Number(req.query.limit) || 5;

//     const jobs = await Job.find({ employer: employerId })
//       .sort({ createdAt: -1 })
//       .limit(limit);

//     res.json({
//       success: true,
//       data: {
//         jobs,
//       },
//     });
//   } catch (err) {
//     console.log("Jobs Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Jobs fetch failed",
//     });
//   }
// });

// /* ================================
//    ✅ GET EMPLOYER ACTIVITIES
// ================================ */
// router.get("/activities", protect, authorize("employer"), async (req, res) => {
//   try {
//     const employerId = req.user._id;

//     const limit = Number(req.query.limit) || 5;

//     const applications = await Application.find({
//       employer: employerId,
//     })
//       .populate("applicant", "name email")
//       .sort({ createdAt: -1 })
//       .limit(limit);

//     const activities = applications.map((app) => ({
//       _id: app._id,
//       type: "application",
//       text: `New application for ${app.jobTitle}`,
//       time: app.createdAt,
//       user: app.applicant?.name || "Candidate",
//       read: false,
//     }));

//     res.json({
//       success: true,
//       data: {
//         activities,
//       },
//     });
//   } catch (err) {
//     console.log("Activity Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Activity fetch failed",
//     });
//   }
// });

// module.exports = router;
// const express = require("express");
// const router = express.Router();

// const Job = require("../models/Job");
// const Application = require("../models/Application");
// const User = require("../models/User");

// const { protect, authorize } = require("../middleware/authMiddleware");

// // ==============================
// // 📌 GET EMPLOYER STATS
// // ==============================
// router.get("/stats", protect, authorize("employer"), async (req, res) => {
//   try {
//     const employerId = req.user._id;

//     const jobs = await Job.find({ employer: employerId });

//     const jobIds = jobs.map((j) => j._id);

//     const applications = await Application.find({
//       job: { $in: jobIds },
//     });

//     const activeJobs = jobs.filter((j) => j.status === "active").length;

//     res.json({
//       success: true,
//       data: {
//         activeJobs,
//         applications: applications.length,
//         pendingReviews: applications.filter((a) => a.status === "pending")
//           .length,
//         conversionRate: jobs.length
//           ? Math.round((applications.length / jobs.length) * 100) + "%"
//           : "0%",
//       },
//     });
//   } catch (err) {
//     console.log("Stats Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Stats load failed",
//     });
//   }
// });

// // ==============================
// // 📌 GET EMPLOYER JOBS
// // ==============================
// router.get("/jobs", protect, authorize("employer"), async (req, res) => {
//   try {
//     const limit = Number(req.query.limit) || 10;

//     const jobs = await Job.find({ employer: req.user._id })
//       .sort({ createdAt: -1 })
//       .limit(limit);

//     res.json({
//       success: true,
//       data: {
//         jobs,
//       },
//     });
//   } catch (err) {
//     console.log("Jobs Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Jobs fetch failed",
//     });
//   }
// });

// // ==============================
// // 📌 GET EMPLOYER ACTIVITIES
// // ==============================
// router.get("/activities", protect, authorize("employer"), async (req, res) => {
//   try {
//     const limit = Number(req.query.limit) || 5;

//     const jobs = await Job.find({ employer: req.user._id });

//     const jobIds = jobs.map((j) => j._id);

//     const applications = await Application.find({
//       job: { $in: jobIds },
//     })
//       .populate("job", "title")
//       .populate("user", "name")
//       .sort({ createdAt: -1 })
//       .limit(limit);

//     const activities = applications.map((a) => ({
//       _id: a._id,
//       type: "application",
//       text: `${a.user?.name} applied for ${a.job?.title}`,
//       time: a.createdAt.toLocaleDateString(),
//       user: a.user?.name,
//       read: false,
//     }));

//     res.json({
//       success: true,
//       data: {
//         activities,
//       },
//     });
//   } catch (err) {
//     console.log("Activity Error:", err);

//     res.status(500).json({
//       success: false,
//       message: "Activities fetch failed",
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const Application = require("../models/Application");

const { protect, authorize } = require("../middleware/authMiddleware");

/* ================= DASHBOARD STATS ================= */
router.get("/stats", protect, authorize("employer"), async (req, res) => {
  try {
    const employerId = req.user._id;

    const jobs = await Job.find({ postedBy: employerId });

    const activeJobs = jobs.filter((j) => j.isActive).length;

    const applications = await Application.countDocuments({
      employer: employerId,
    });

    res.json({
      success: true,
      data: {
        activeJobs,
        applications,
        pendingReviews: 0,
        conversionRate: "0%",
      },
    });
  } catch (err) {
    console.log("Stats Error:", err);

    res.status(500).json({
      success: false,
      message: "Stats load failed",
    });
  }
});

/* ================= EMPLOYER JOBS ================= */
router.get("/jobs", protect, authorize("employer"), async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const jobs = await Job.find({
      postedBy: req.user._id, // 🔥 FIXED
    })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: {
        jobs,
      },
    });
  } catch (err) {
    console.log("Employer Jobs Error:", err);

    res.status(500).json({
      success: false,
      message: "Jobs fetch failed",
    });
  }
});

/* ================= RECENT ACTIVITY ================= */
router.get("/activities", protect, authorize("employer"), async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;

    const jobs = await Job.find({
      postedBy: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(limit);

    const activities = jobs.map((job) => ({
      _id: job._id,
      type: "job",
      text: `New job posted: ${job.title}`,
      time: job.createdAt.toDateString(),
      user: "You",
      read: false,
    }));

    res.json({
      success: true,
      data: {
        activities,
      },
    });
  } catch (err) {
    console.log("Activity Error:", err);

    res.status(500).json({
      success: false,
      message: "Activities fetch failed",
    });
  }
});

module.exports = router;
