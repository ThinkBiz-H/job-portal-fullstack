const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/* ================= TOKEN ================= */
const generateToken = (id, userType) => {
  return jwt.sign({ id: id.toString(), userType }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/* ================= SAFE USER ================= */
const getSafeUser = (user) => {
  const data = user.toObject();

  delete data.password;
  delete data.otp;
  delete data.otpExpire;
  delete data.otpCount;

  return data;
};

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    let { name, email, password, userType, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    email = email.toLowerCase();

    const exist = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      userType: userType || "jobseeker",

      isVerified: true,
      college: "",
      location: "",
      // gender: "",
      dateOfBirth: null,
      resume: "",

      jobseekerProfile: {
        skills: [],
        educationDetails: [],
        experience: [],
        certifications: [],
        languages: [],
        bio: "",
      },
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully. Please verify OTP.",
      data: getSafeUser(user),
    });
  } catch (err) {
    console.error("Register Error:", err);

    res.status(500).json({
      success: false,
      message: "Register failed",
    });
  }
};
exports.updateEmployerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.userType !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employer allowed",
      });
    }

    const profile = req.body.profile || {};

    if (!user.employerProfile) {
      user.employerProfile = {};
    }

    /* ===== BASIC ===== */
    if ("email" in profile) user.email = String(profile.email || "");
    if ("phone" in profile) user.phone = String(profile.phone || "");

    /* ===== TEXT FIELDS ===== */
    const fields = [
      "companyName",
      "tagline",
      "description",
      "website",
      "industry",
      "companyType",
      "headquarters",
      "linkedin",
      "twitter",
      "facebook",
      "instagram",
      "mission",
      "vision",
      "teamSize",
      "workCulture",
      "logo",
      "coverPhoto",
      "avgEmployeeTenure",
      "companySize", // ✅ ADDED
      "avgResponseTime",
      "candidateSatisfaction",
    ];

    fields.forEach((f) => {
      if (f in profile) {
        user.employerProfile[f] = String(profile[f] || "");
      }
    });

    /* ===== NUMBER FIELDS - ✅ ADD THIS SECTION ===== */
    if ("foundedYear" in profile) {
      user.employerProfile.foundedYear = parseInt(profile.foundedYear) || null;
    }

    if ("totalJobsPosted" in profile) {
      user.employerProfile.totalJobsPosted =
        parseInt(profile.totalJobsPosted) || 0;
    }

    if ("totalHires" in profile) {
      user.employerProfile.totalHires = parseInt(profile.totalHires) || 0;
    }

    /* ===== ARRAYS ===== */
    if (Array.isArray(profile.locations)) {
      user.employerProfile.locations = profile.locations.map(String);
    }

    if (Array.isArray(profile.benefits)) {
      user.employerProfile.benefits = profile.benefits.map(String);
    }

    if (Array.isArray(profile.values)) {
      user.employerProfile.values = profile.values.map(String);
    }

    if (Array.isArray(profile.specialties)) {
      user.employerProfile.specialties = profile.specialties.map(String);
    }

    /* ===== BOOLEAN ===== */
    if ("isVerified" in profile) {
      user.employerProfile.isVerified = Boolean(profile.isVerified);
    }

    await user.save();

    res.json({
      success: true,
      message: "Employer profile updated",
      data: getSafeUser(user),
    });
  } catch (err) {
    console.error("Employer Update Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email / Phone & Password required",
      });
    }

    email = email.toLowerCase();

    const user = await User.findOne({
      $or: [{ email }, { phone: email }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your account first",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      data: {
        ...getSafeUser(user),
        token: generateToken(user._id, user.userType),
      },
    });
  } catch (err) {
    console.error("Login Error:", err);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

/* ================= GET PROFILE ================= */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const data = getSafeUser(user);

    if (data.dateOfBirth) {
      data.dob = data.dateOfBirth.toISOString().split("T")[0];
    }

    if (data.userType === "employer") {
      data.profile = data.employerProfile || {};
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("GetMe Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

/* ================= UPDATE JOBSEEKER PROFILE ================= */
exports.updateJobseekerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.userType !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only jobseeker allowed",
      });
    }

    const {
      basic,
      userInfo,
      education,
      skills,
      experience,
      certificate,
      language,
      resume,
    } = req.body;

    /* ===== BASIC ===== */
    if (basic) {
      if (basic.email) {
        const exist = await User.findOne({ email: basic.email });

        if (exist && exist._id.toString() !== user._id.toString()) {
          return res.status(400).json({
            success: false,
            message: "Email already used",
          });
        }

        user.email = basic.email.toLowerCase();
      }

      if (basic.mobile) {
        const exist = await User.findOne({ phone: basic.mobile });

        if (exist && exist._id.toString() !== user._id.toString()) {
          return res.status(400).json({
            success: false,
            message: "Phone already used",
          });
        }

        user.phone = basic.mobile;
      }

      if (basic.dob) user.dateOfBirth = new Date(basic.dob);
      if (basic.gender) user.gender = basic.gender;
    }

    /* ===== USER INFO ===== */
    if (userInfo) {
      if (userInfo.name) user.name = userInfo.name;
      if (userInfo.college) user.college = userInfo.college;
      if (userInfo.location) user.location = userInfo.location;
      if (userInfo.image) user.profileImage = userInfo.image;
    }

    /* ===== INIT PROFILE ===== */
    if (!user.jobseekerProfile) {
      user.jobseekerProfile = {
        skills: [],
        educationDetails: [],
        experience: [],
        certifications: [],
        languages: [],
        bio: "",
      };
    }

    /* ===== EDUCATION ===== */
    let eduList = [];

    if (Array.isArray(education)) {
      eduList = education;
    } else if (typeof education === "object") {
      eduList = [education];
    }

    user.jobseekerProfile.educationDetails = [];

    eduList.forEach((e) => {
      user.jobseekerProfile.educationDetails.push({
        degree: String(e.degree || ""),
        college: String(e.college || ""),
        field: String(e.field || ""),
        batch: String(e.batch || ""),
        type: String(e.type || ""),
      });
    });

    /* ===== SKILLS ===== */
    if (Array.isArray(skills)) {
      user.jobseekerProfile.skills = skills.map((s) => ({
        name: String(s || ""),
      }));
    }

    /* ===== EXPERIENCE ===== */
    if (Array.isArray(experience)) {
      user.jobseekerProfile.experience = experience.map((exp) => ({
        company: String(exp.company || ""),
        position: String(exp.position || ""),
        startDate: exp.startDate ? new Date(exp.startDate) : null,
        endDate: exp.endDate ? new Date(exp.endDate) : null,
        currentlyWorking: Boolean(exp.currentlyWorking || false),
        description: String(exp.description || ""),
      }));
    }

    /* ===== CERTIFICATE ===== */
    if (Array.isArray(certificate)) {
      user.jobseekerProfile.certifications = certificate.map((cert) => ({
        name: String(cert.name || ""),
        issuer: String(cert.issuer || ""),
        issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
        expiryDate: cert.expiryDate ? new Date(cert.expiryDate) : null,
        credentialId: String(cert.credentialId || ""),
        url: String(cert.url || ""),
      }));
    }

    /* ===== LANGUAGE ===== */
    if (Array.isArray(language)) {
      user.jobseekerProfile.languages = language.map((lang) => ({
        language: String(lang.language || ""),
        proficiency: String(lang.proficiency || "Basic"),
      }));
    }

    /* ===== RESUME ===== */
    if (resume) user.resume = String(resume);

    await user.save();

    res.json({
      success: true,
      message: "Profile updated",
      data: getSafeUser(user),
    });
  } catch (err) {
    console.error("Update Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateEmployerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.userType !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employer allowed",
      });
    }

    const profile = req.body.profile || {};

    if (!user.employerProfile) {
      user.employerProfile = {};
    }

    /* ===== BASIC ===== */
    if ("email" in profile) user.email = String(profile.email || "");
    if ("phone" in profile) user.phone = String(profile.phone || "");

    /* ===== TEXT FIELDS ===== */
    const fields = [
      "companyName",
      "tagline",
      "description",
      "website",
      "industry",
      "companyType",
      "headquarters",
      "linkedin",
      "twitter",
      "facebook",
      "instagram",
      "mission",
      "vision",
      "teamSize",
      "workCulture",
      "logo", // ✅ ADD
      "coverPhoto", // ✅ ADD
    ];

    fields.forEach((f) => {
      if (f in profile) {
        user.employerProfile[f] = String(profile[f] || "");
      }
    });

    /* ===== ARRAYS ===== */
    if (Array.isArray(profile.locations)) {
      user.employerProfile.locations = profile.locations.map(String);
    }

    if (Array.isArray(profile.benefits)) {
      user.employerProfile.benefits = profile.benefits.map(String);
    }

    if (Array.isArray(profile.values)) {
      user.employerProfile.values = profile.values.map(String);
    }

    if (Array.isArray(profile.specialties)) {
      user.employerProfile.specialties = profile.specialties.map(String);
    }

    /* ===== VERIFICATION ===== */
    if ("isVerified" in profile) {
      user.employerProfile.isVerified = Boolean(profile.isVerified);
    }

    await user.save();

    res.json({
      success: true,
      message: "Employer profile updated",
      data: getSafeUser(user),
    });
  } catch (err) {
    console.error("Employer Update Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
