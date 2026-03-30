import { extractText } from "unpdf";
import generateInterviewReport from "../services/ai.service.js";
import { interviewReportModel } from "../models/interviewReport.model.js";

const interviewReportController = async (req, res) => {
  const resumeBuffer = new Uint8Array(req.file.buffer);
  const { text } = await extractText(resumeBuffer, { mergePages: true });

  const { selfDescription, jobDescription } = req.body;

  try {
    const interviewReportByAI = await generateInterviewReport({
      resume: text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: text,
      selfDescription,
      jobDescription,
      ...interviewReportByAI,
    });

    res.status(201).json({
      message: "Interview Resport Generated Successfully",
      interviewReport,
    });
  } catch (err) {
    console.log("API Error: ", err);
    return res.status(500).json({
        message: "Something went Wrong!",
        err
    })
  }
};

export { interviewReportController };
