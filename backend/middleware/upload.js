const multer = require("multer");
const path = require("path");

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + Math.random() + path.extname(file.originalname),
    );
  },
});

// File filter (only pdf/doc/docx)
const fileFilter = (req, file, cb) => {
  const allowed = /pdf|doc|docx/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());

  if (ext) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF/DOC allowed"));
  }
};

module.exports = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter,
});
