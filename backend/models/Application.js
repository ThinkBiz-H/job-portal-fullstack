// const mongoose = require("mongoose");

// const applicationSchema = new mongoose.Schema({
//   job: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Job",
//     required: true,
//   },
//   applicant: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   employer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   resume: {
//     url: String,
//     fileName: String,
//   },
//   coverLetter: String,
//   status: {
//     type: String,
//     enum: ["pending", "reviewed", "shortlisted", "rejected", "accepted"],
//     default: "pending",
//   },
//   notes: String,
//   appliedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   reviewedAt: Date,
//   interviewDate: Date,
//   feedback: String,
//   rating: {
//     type: Number,
//     min: 1,
//     max: 5,
//   },
//   answers: [
//     {
//       questionId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//       },
//       question: String, // snapshot (optional but useful)
//       answer: mongoose.Schema.Types.Mixed,
//     },
//   ],
// });

// // Create index for faster queries
// applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

// // ✅ FIX: Change "jobSchema" to "applicationSchema"
// module.exports = mongoose.model("Application", applicationSchema);
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },

  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  resume: {
    url: String,
    fileName: String,
  },

  coverLetter: String,

  /* 🔥 SCREENING ANSWERS */
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      question: String,
      answer: mongoose.Schema.Types.Mixed,
    },
  ],

  status: {
    type: String,
    enum: ["pending", "reviewed", "shortlisted", "rejected", "accepted"],
    default: "pending",
  },

  notes: String,
  appliedAt: { type: Date, default: Date.now },
  reviewedAt: Date,
  interviewDate: Date,
  feedback: String,

  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
