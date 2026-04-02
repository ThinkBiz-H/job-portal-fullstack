// server.js - FINAL FIXED VERSION

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// ================= CREATE APP (🔥 FIRST) =================
const app = express();

// ================= IMPORT ROUTES =================
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const employerRoutes = require("./routes/employerRoutes");
const userRoutes = require("./routes/userRoutes");
const otpRoutes = require("./routes/otpRoutes");
const sendEmail = require("./utils/sendEmail");
const adminRoutes = require("./routes/adminRoutes");

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/api/employer", employerRoutes);
// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/otp", otpRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
// ================= DATABASE =================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    const db = mongoose.connection;
    console.log(`📊 Database: ${db.name}`);
    console.log(`🌍 Host: ${db.host}`);
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

connectDB();

// ================= ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
// ================= EMAIL TEST =================
app.get("/api/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER, // 👈 same gmail jisse bhej raha
      subject: "🔥 Email Test Success",
      html: "<h2>If you got this mail, Nodemailer is working 🚀</h2>",
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ EMAIL ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ================= HOME =================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Job Portal Backend Running",
    status: "OK",
  });
});

// ================= TEST =================
app.get("/api/test", async (req, res) => {
  try {
    const state = mongoose.connection.readyState;

    const statusText = ["disconnected", "connected", "connecting"][state];

    res.json({
      success: true,
      server: "Running",
      db: statusText,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ================= 404 =================
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);

  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

// ================= START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log("🚀 JOB PORTAL BACKEND STARTED");
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Mode: ${process.env.NODE_ENV || "dev"}`);
  console.log("=".repeat(50));
});
