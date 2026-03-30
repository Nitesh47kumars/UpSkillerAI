import { Router } from "express";
import authUser from "../middlewares/auth.middleware.js";
import { interviewReportController } from "../controllers/interview.controller.js";
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
  interviewReportController
);
