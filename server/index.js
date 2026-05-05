require("dotenv").config();

const mammoth = require("mammoth");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer();

// 🧠 ROLE-BASED SKILL DATABASE (LANGUAGES + FRAMEWORKS)
const jobSkills = {
  frontend: [
    "html", "css", "javascript", "typescript",
    "react", "nextjs", "vue", "angular",
    "redux", "tailwind", "bootstrap",
    "api", "axios"
  ],

  backend: [
    "node", "express", "mongodb", "mysql", "postgresql",
    "api", "rest", "graphql",
    "java", "spring", "python", "django", "flask"
  ],

  fullstack: [
    "react", "node", "express", "mongodb",
    "mysql", "api", "javascript", "typescript"
  ],

  data_scientist: [
    "python", "pandas", "numpy", "machine learning",
    "deep learning", "tensorflow", "pytorch",
    "statistics", "data analysis"
  ],

  devops: [
    "docker", "kubernetes", "aws", "azure",
    "ci/cd", "jenkins", "linux", "terraform"
  ],

  mobile: [
    "flutter", "react native", "android", "ios",
    "swift", "kotlin"
  ],

  uiux: [
    "figma", "adobe xd", "wireframe",
    "prototype", "design", "user research"
  ],

  qa: [
    "testing", "automation", "selenium",
    "jest", "cypress", "manual testing"
  ],

  cloud: [
    "aws", "azure", "gcp",
    "cloud computing", "serverless"
  ],

  cybersecurity: [
    "security", "network", "encryption",
    "penetration testing", "firewall"
  ]
};

// 📌 GET ROLES
app.get("/roles", (req, res) => {
  res.json(Object.keys(jobSkills));
});

// 🚀 ANALYZE RESUME (NO AI, STABLE)
app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let text = "";

    // 📄 PDF
    if (req.file.mimetype === "application/pdf") {
      const pdfData = await pdfParse(req.file.buffer);
      text = pdfData.text;
    }

    // 📄 DOCX
    else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        buffer: req.file.buffer,
      });
      text = result.value;
    }

    else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    const role = req.body.role;
    const skills = jobSkills[role] || [];

    const resumeText = text.toLowerCase();

    // ✅ MATCH SKILLS
    const matched = skills.filter(skill =>
      resumeText.includes(skill.toLowerCase())
    );

    const missing = skills.filter(skill =>
      !resumeText.includes(skill.toLowerCase())
    );

    // ✅ SCORE
    const score = skills.length
      ? Math.round((matched.length / skills.length) * 100)
      : 0;

    res.json({
      success: true,
      score,
      matched,
      missing,
      preview: text.substring(0, 300),
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Analysis failed" });
  }
});

// 🚀 START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});