const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/* ================= TOKEN ================= */
const generateToken = (id, userType, email) => {
  return jwt.sign({ id, userType, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
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

      college: "",
      location: "",
      gender: "",
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
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        token: generateToken(user._id, user.userType, user.email),
      },
    });
  } catch (err) {
    console.error("❌ Register Error:", err);

    res.status(500).json({
      success: false,
      message: "Register failed",
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
        message: "Email & password required",
      });
    }

    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        token: generateToken(user._id, user.userType, user.email),
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

/* ================= GET PROFILE ================= */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otp");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const data = user.toObject();

    if (data.dateOfBirth) {
      data.dob = data.dateOfBirth.toISOString().split("T")[0];
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("❌ Get Profile Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

/* ================= UPDATE JOBSEEKER PROFILE ================= */
exports.updateJobseekerProfile = async (req, res) => {
  try {
    console.log("📥 Update Profile Hit");
    console.log("REQ BODY ===>", JSON.stringify(req.body, null, 2));

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
      if (basic.email) user.email = basic.email;
      if (basic.mobile) user.phone = basic.mobile;
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

    /* ===== EDUCATION (FINAL FIX) ===== */
    let eduList = [];

    if (education !== undefined && education !== null) {
      // Array
      if (Array.isArray(education)) {
        eduList = education;
      }

      // String
      else if (typeof education === "string") {
        try {
          eduList = JSON.parse(education);
        } catch {
          try {
            const fixed = education
              .replace(/'/g, '"')
              .replace(/(\w+):/g, '"$1":');

            eduList = JSON.parse(fixed);
          } catch {
            eduList = [];
          }
        }
      }

      // Object
      else if (typeof education === "object") {
        eduList = [education];
      }
    }

    // Clean
    eduList = eduList.filter(
      (e) => e && typeof e === "object" && !Array.isArray(e),
    );

    // 🔥 RESET OLD BAD DATA
    user.jobseekerProfile.educationDetails = [];

    // 🔥 Tell mongoose
    user.markModified("jobseekerProfile.educationDetails");

    // 🔥 PUSH CLEAN DATA
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
    if (resume) {
      user.resume = String(resume);
    }

    await user.save({ validateBeforeSave: false });

    console.log("✅ Profile Updated Successfully");

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (err) {
    console.error("🔥 Update Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= SEND OTP ================= */
exports.sendOTP = async (req, res) => {
  try {
    const { phone, userType } = req.body;

    console.log("📩 OTP Request:", phone, userType);

    if (!phone || !userType) {
      return res.status(400).json({
        success: false,
        message: "phone & userType required",
      });
    }

    let user = await User.findOne({ phone, userType });

    if (!user) {
      user = await User.create({
        name: "User",
        phone,
        userType,
        password: crypto.randomBytes(16).toString("hex"),

        jobseekerProfile: {
          skills: [],
          educationDetails: [],
          experience: [],
          certifications: [],
          languages: [],
          bio: "",
        },
      });
    }

    const otp = user.generateOTP();

    console.log("🔥 GENERATED OTP:", otp);

    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      message: "OTP sent",
      otp,
    });
  } catch (err) {
    console.error("❌ OTP Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= VERIFY OTP ================= */
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp, userType } = req.body;

    if (!phone || !otp || !userType) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const user = await User.findOne({ phone, userType });

    if (!user || !user.verifyOTP(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.clearOTP();
    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        userType: user.userType,
        token: generateToken(user._id, user.userType, user.email),
      },
    });
  } catch (err) {
    console.error("❌ Verify OTP Error:", err);

    res.status(500).json({
      success: false,
      message: "Verify failed",
    });
  }
};
