const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: String,

    userType: {
      type: String,
      enum: ["jobseeker", "employer", "admin"],
      default: "jobseeker",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    /* ===== BASIC ===== */
    dateOfBirth: Date,

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      default: "Prefer not to say",
    },

    college: { type: String, default: "" },
    location: { type: String, default: "" },

    profileImage: {
      type: String,
      default: "/images/default-avatar.png",
    },

    resume: { type: String, default: "" },

    /* ===== JOBSEEKER ===== */
    jobseekerProfile: {
      skills: [
        {
          name: String,
          _id: false,
        },
      ],

      bio: { type: String, default: "" },

      educationDetails: {
        type: [
          {
            degree: { type: String, default: "" },
            college: { type: String, default: "" },
            field: { type: String, default: "" },
            batch: { type: String, default: "" },
            type: { type: String, default: "" },
          },
        ],
        default: [],
      },

      experience: [
        {
          company: String,
          position: String,
          startDate: Date,
          endDate: Date,
          currentlyWorking: Boolean,
          description: String,
          _id: false,
        },
      ],

      certifications: [
        {
          name: String,
          issuer: String,
          issueDate: Date,
          expiryDate: Date,
          credentialId: String,
          url: String,
          _id: false,
        },
      ],

      languages: [
        {
          language: String,
          proficiency: {
            type: String,
            enum: ["Basic", "Intermediate", "Fluent", "Native"],
          },
          _id: false,
        },
      ],
    },

    employerProfile: {
      companyName: String,
      tagline: String,
      description: String,
      website: String,
      industry: String,
      companyType: String,

      // ✅ ADD THESE TWO
      logo: {
        type: String,
        default: "",
      },

      coverPhoto: {
        type: String,
        default: "",
      },

      companySize: {
        type: String,
        enum: COMPANY_SIZES,
        default: "1-10",
      },

      foundedYear: Number,
      headquarters: String,
      locations: [String],

      linkedin: String,
      twitter: String,
      facebook: String,
      instagram: String,

      mission: String,
      vision: String,
      values: [String],

      specialties: [String],
      benefits: [String],

      teamSize: String,
      avgEmployeeTenure: String,
      workCulture: String,

      isVerified: { type: Boolean, default: false },
      verificationLevel: { type: String, default: "basic" },
      documentsVerified: [String],

      totalJobsPosted: { type: Number, default: 0 },
      totalHires: { type: Number, default: 0 },
      avgResponseTime: { type: String, default: "0 days" },
      candidateSatisfaction: { type: String, default: "0/5" },
    },

    /* ===== OTP ===== */
    otp: String,
    otpExpire: Date,

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  { timestamps: true },
);

/* ===== PASSWORD HASH ===== */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* ===== MATCH PASSWORD ===== */
userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

/* ===== OTP ===== */
userSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  this.otp = otp;
  this.otpExpire = Date.now() + 10 * 60 * 1000;

  return otp;
};

userSchema.methods.verifyOTP = function (otp) {
  return this.otp === otp && this.otpExpire > Date.now();
};

userSchema.methods.clearOTP = function () {
  this.otp = null;
  this.otpExpire = null;
};

/* ===== JWT ===== */
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      userType: this.userType,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" },
  );
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
