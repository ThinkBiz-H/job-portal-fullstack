const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    salary: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "INR",
      },
      isDisclosed: {
        type: Boolean,
        default: false,
      },
    },

    jobType: {
      type: String,
      enum: [
        "full-time",
        "part-time",
        "contract",
        "internship",
        "remote",
        "freelance",
      ],
      default: "full-time",
    },

    experience: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 0,
      },
    },

    description: {
      type: String,
      required: true,
    },

    requirements: {
      type: [String],
      default: [],
    },

    responsibilities: {
      type: [String],
      default: [],
    },

    skillsRequired: {
      type: [String],
      default: [],
    },

    benefits: {
      type: [String],
      default: [],
    },

    // ✅ VERY IMPORTANT
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    applicationDeadline: Date,

    totalViews: {
      type: Number,
      default: 0,
    },

    totalApplications: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // ✅ auto createdAt + updatedAt
  },
);

module.exports = mongoose.model("Job", jobSchema);
