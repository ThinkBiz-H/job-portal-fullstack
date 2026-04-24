const OpenAI = require("openai");

const getClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1", // 🔥 ye add kar
  });
};

// Summary
exports.generateSummary = async (req, res) => {
  try {
    const openai = getClient();

    const { skills, education, projects } = req.body;

    const response = await openai.chat.completions.create({
      model: "openrouter/auto",
      messages: [
        {
          role: "user",
          content: `Create a professional resume summary for:
          Skills: ${skills}
          Education: ${education}
          Projects: ${projects}`,
        },
      ],
    });

    res.json({ summary: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ATS
exports.getATSScore = (req, res) => {
  const { skills, jobDescription } = req.body;

  const userSkills = skills.toLowerCase().split(",");
  const jobSkills = jobDescription.toLowerCase();

  let match = userSkills.filter((skill) => jobSkills.includes(skill.trim()));

  let score = Math.round((match.length / userSkills.length) * 100);

  res.json({ score });
};

// Improve
exports.improveResume = async (req, res) => {
  try {
    const openai = getClient();

    const { projects } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Improve this resume project:
          ${projects}`,
        },
      ],
    });

    res.json({ improved: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 🔥 Project to Resume Points
exports.generateProjectPoints = async (req, res) => {
  try {
    const openai = getClient();

    const { projects, skills } = req.body;

    const response = await openai.chat.completions.create({
      model: "openrouter/auto",
      messages: [
        {
          role: "user",
          content: `
Convert this project into strong resume bullet points.

Rules:
- Use 4–6 bullet points
- Start each line with action verbs (Developed, Built, Implemented)
- Mention technologies if possible
- Make it ATS-friendly
- Keep it concise and professional

Project:
${projects}

Skills:
${skills}
          `,
        },
      ],
    });

    res.json({
      points: response.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};