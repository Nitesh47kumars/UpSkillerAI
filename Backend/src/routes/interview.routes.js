import { Router } from "express";
import authUser from "../middlewares/auth.middleware.js";
import {
  generateInterviewReportController,
  getAllInterviewReportsController,
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

/**
 *  @route GET /api/interview/report/:interviewId
 *  @description get the sepecific interview report by id
 *  @access private
 */
interviewRouter.get(
  "/report/:interviewId",
  authUser,
  getInterviewReportByIdController
);

/**
 *  @route GET /api/interview/report/:interviewId
 *  @description get All interview reports of a sepecific User
 *  @access private
 */
interviewRouter.get(
  "/",
  authUser,
  getAllInterviewReportsController
);
