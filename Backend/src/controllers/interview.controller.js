import { extractText } from "unpdf";
import generateInterviewReport from "../services/ai.service.js";
import { interviewReportModel } from "../models/interviewReport.model.js";

/**
 * @requires resume selfDescription jobDescription
 * @description Controller to Generate Interview Report
 */
const generateInterviewReportController = async (req, res) => {
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
      return res
        .status(429)
        .json({ message: "AI rate limit hit, try again in a moment." });
    }

    return res
      .status(500)
      .json({ message: "Something went wrong!", error: err.message });
  }
};

/**
 * @requires InterviewId
 * @description Controller to get interview report by interviewid
 */
const getInterviewReportByIdController = async (req, res) => {
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(401).json({
      message: "Interview Report Not Found!",
    });
  }

  return res.status(200).json({
    message: "Interview Report Fetched Successfully",
    interviewReport,
  });
};

/**
 * @requires userId
 * @description Controller to get All Report from Sepecific User
 */
const getAllInterviewReportsController = async (req, res) => {
  const interviewReports = interviewReportModel
};

export {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
};
