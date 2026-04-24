const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 🔥 ATS LOGIC
function processATS(text) {
  const resumeText = text.toLowerCase();

  const skillsMap = {
    react: ["react"],
    node: ["node", "nodejs", "node.js"],
    mongodb: ["mongodb", "mongo"],
    javascript: ["javascript", "js"],
    html: ["html"],
    css: ["css"],
    nextjs: ["nextjs", "next.js", "next js"],
    express: ["express", "expressjs"],
  };

  let matched = [];
  let missing = [];

  // ✅ SMART SKILL MATCH
  Object.keys(skillsMap).forEach((skill) => {
    const variants = skillsMap[skill];

    const found = variants.some((v) => resumeText.includes(v.toLowerCase()));

    if (found) matched.push(skill);
    else missing.push(skill);
  });

  let score = 0;

  // ================= SKILLS (40%) =================
  let skillScore = (matched.length / Object.keys(skillsMap).length) * 40;
  score += skillScore;

  // ================= SECTIONS (20%) =================
  let sectionScore = 0;

  if (resumeText.includes("experience")) sectionScore += 7;
  if (resumeText.includes("project")) sectionScore += 7;
  if (resumeText.includes("education")) sectionScore += 6;

  score += sectionScore;

  // ================= KEYWORD DENSITY (15%) =================
  let keywordHits = 0;

  Object.values(skillsMap).forEach((variants) => {
    variants.forEach((word) => {
      const regex = new RegExp(word, "g");
      const matches = resumeText.match(regex);
      if (matches) keywordHits += matches.length;
    });
  });

  let densityScore = Math.min(keywordHits, 10) * 1.5;
  score += densityScore;

  // ================= LENGTH (10%) =================
  let lengthScore = 0;

  if (text.length > 1500) lengthScore = 10;
  else if (text.length > 800) lengthScore = 7;
  else lengthScore = 3;

  score += lengthScore;

  // ================= ACTION WORDS (15%) =================
  const actionWords = [
    "developed",
    "built",
    "created",
    "implemented",
    "designed",
  ];

  let actionScore = 0;

  actionWords.forEach((word) => {
    if (resumeText.includes(word)) actionScore += 3;
  });

  actionScore = Math.min(actionScore, 15);
  score += actionScore;

  // ================= FINAL =================
  score = Math.round(score);

  // ================= SUGGESTIONS =================
  let suggestions = [];

  if (missing.length > 0) {
    suggestions.push("Add missing skills: " + missing.join(", "));
  }

  if (!resumeText.includes("experience")) {
    suggestions.push("Add Work Experience section");
  }

  if (!resumeText.includes("project")) {
    suggestions.push("Add Projects section");
  }

  if (text.length < 800) {
    suggestions.push("Increase resume length");
  }

  if (actionScore < 6) {
    suggestions.push("Use strong action words");
  }

  return {
    score,
    matched,
    missing,
    suggestions,
  };
}

// ================= ROUTE =================
router.post("/scan", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let text = "";

    if (req.file.mimetype.includes("pdf")) {
      try {
        const data = await pdfParse(req.file.buffer);
        text = data.text || "";
      } catch {
        text = req.file.buffer.toString("utf-8"); // fallback
      }
    } else if (req.file.mimetype.includes("word")) {
      try {
        const result = await mammoth.extractRawText({
          buffer: req.file.buffer,
        });
        text = result.value || "";
      } catch {
        return res.status(500).json({ error: "DOCX parsing failed" });
      }
    } else {
      return res.status(400).json({ error: "Only PDF/DOCX allowed" });
    }

    if (!text || text.trim().length < 20) {
      text = req.file.buffer.toString("utf-8");
    }

    const result = processATS(text);

    return res.json(result);
  } catch (err) {
    console.error("ATS ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
