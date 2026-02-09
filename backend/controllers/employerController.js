// 📌 Direct routes/employerRoutes.js ke START mein yeh add kar do:

const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

// 📊 Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const employerId = req.user._id;

    const [
      totalJobs,
      activeJobs,
      totalApplications,
      interviews,
      pendingReviews,
      hired,
      rejected,
      jobs,
    ] = await Promise.all([
      Job.countDocuments({ employer: employerId }),
      Job.countDocuments({ employer: employerId, status: "active" }),
      Application.countDocuments({ employer: employerId }),
      Application.countDocuments({ employer: employerId, status: "interview" }),
      Application.countDocuments({ employer: employerId, status: "applied" }),
      Application.countDocuments({ employer: employerId, status: "accepted" }),
      Application.countDocuments({ employer: employerId, status: "rejected" }),
      Job.find({ employer: employerId }).select("views"),
    ]);

    const totalViews = jobs.reduce((sum, job) => sum + (job.views || 0), 0);
    const conversionRate =
      totalApplications > 0
        ? Math.round((hired / totalApplications) * 100) + "%"
        : "0%";
    const interviewRate =
      totalApplications > 0
        ? Math.round((interviews / totalApplications) * 100) + "%"
        : "0%";

    res.json({
      totalJobs,
      activeJobs,
      applications: totalApplications,
      interviews,
      pendingReviews,
      conversionRate,
      totalViews,
      avgResponseTime: "2.4 days",
      hired,
      rejected,
      interviewRate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🏢 Company Profile
const getCompanyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "employerProfile email phone",
    );

    res.json({
      name: user.employerProfile?.companyName || "Your Company",
      email: user.email,
      phone: user.phone,
      website: user.employerProfile?.website || "",
      industry: user.employerProfile?.industry || "",
      size: user.employerProfile?.companySize || "",
      founded: user.employerProfile?.foundedYear || "",
      logo: user.employerProfile?.logo || "/company-logo.png",
      rating: 4.8,
      verified: user.employerProfile?.isVerified || false,
      social: {
        linkedin: user.employerProfile?.linkedin || "",
        twitter: user.employerProfile?.twitter || "",
        facebook: user.employerProfile?.facebook || "",
        instagram: user.employerProfile?.instagram || "",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📈 Performance Metrics
const getPerformanceMetrics = async (req, res) => {
  try {
    res.json({
      metrics: [
        { label: "Job Views", value: "2,890", change: "+12.5%", trend: "up" },
        { label: "Applications", value: "532", change: "+8.3%", trend: "up" },
        {
          label: "Avg. Response Time",
          value: "2.4 days",
          change: "-0.8 days",
          trend: "up",
        },
        {
          label: "Interview Rate",
          value: "8.8%",
          change: "+2.1%",
          trend: "up",
        },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 💼 Employer Jobs
const getEmployerJobs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const employerId = req.user._id;

    const jobs = await Job.find({ employer: employerId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applicantsCount = await Application.countDocuments({
          job: job._id,
        });
        return {
          ...job,
          id: job._id,
          applicants: applicantsCount,
          salary: job.salary || "Not specified",
          type: job.jobType || "Full-time",
          urgent: job.isUrgent || false,
          date: job.createdAt.toISOString().split("T")[0],
        };
      }),
    );

    res.json({
      jobs: jobsWithApplicants,
      total: jobs.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔔 Recent Activities
const getRecentActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const employerId = req.user._id;

    const applications = await Application.find({ employer: employerId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("job", "title")
      .populate("user", "name")
      .lean();

    const activities = applications.map((app, index) => ({
      id: app._id || `app-${index}`,
      text: `New application received for ${app.job?.title || "a job"}`,
      time: formatTimeAgo(app.createdAt),
      type: "application",
      user: app.user?.name || "Applicant",
      read: false,
    }));

    res.json({
      activities,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👥 Recent Applicants
const getRecentApplicants = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const employerId = req.user._id;

    const applicants = await Application.find({ employer: employerId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("user", "name email profileImage")
      .populate("job", "title")
      .lean();

    const formattedApplicants = applicants.map((app) => ({
      id: app._id,
      name: app.user?.name,
      email: app.user?.email,
      jobTitle: app.job?.title,
      status: app.status,
      appliedDate: app.createdAt,
      resume: app.resume,
      profileImage: app.user?.profileImage || "/images/default-avatar.png",
    }));

    res.json({
      applicants: formattedApplicants,
      total: applicants.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⏰ Helper: Format time ago
function formatTimeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}
