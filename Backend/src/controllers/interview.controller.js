import { extractText } from "unpdf";
import generateInterviewReport from "../services/ai.service.js";
import { interviewReportModel } from "../models/interviewReport.model.js";

const interviewReportController = async (req, res) => {
  try {
    const resumeBuffer = new Uint8Array(req.file.buffer);
    const { text } = await extractText(resumeBuffer, { mergePages: true });
    const resumeText = Array.isArray(text) ? text.join(" ") : text;

    const { selfDescription, jobDescription } = req.body;

    console.log("Resume Text Preview:", resumeText?.slice(0, 200));

    const interviewReportByAI = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,
      ...interviewReportByAI,
    });

    res.status(201).json({
      message: "Interview Report Generated Successfully",
      interviewReport,
    });
  } catch (err) {
    console.log("API Error: ", err);

    if (err?.message?.includes("429") || err?.status === 429) {
      return res.status(429).json({ message: "AI rate limit hit, try again in a moment." });
    }

    return res.status(500).json({ message: "Something went wrong!", error: err.message });
  }
};

export { interviewReportController };