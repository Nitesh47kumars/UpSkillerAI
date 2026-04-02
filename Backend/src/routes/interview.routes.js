import { Router } from "express";
import authUser from "../middlewares/auth.middleware.js";
import {
  generateInterviewReportController,
  getInterviewReportByIdController,
} from "../controllers/interview.controller.js";
import upload from "../middlewares/file.multer.js";

export const interviewRouter = Router();

/**
 *  @route POST /api/interview
 *  @description generate new interview report on the basis of user self description, resume, pdf and job description
 *  @access private
 */
interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  generateInterviewReportController
);

interviewRouter.get(
  "/report/:interviewID",
  authUser,
  getInterviewReportByIdController
);

interviewRouter.get(
  "/report/:interviewID",
  authUser,
  getAllInterviewReportsController
);
