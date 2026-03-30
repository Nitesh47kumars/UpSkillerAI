import mongoose, { Schema } from "mongoose";

const technicalQuestionsSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "Technical Question is Required!"],
    },
    intention: {
      type: String,
      required: [true, "Intention is Required!"],
    },
    answer: {
      type: String,
      required: [true, "Answer is Required!"],
    },
  },
  { _id: false }
);

const behavioralQuestionsSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "Technical Question is Required!"],
    },
    intention: {
      type: String,
      required: [true, "Intention is Required!"],
    },
    answer: {
      type: String,
      required: [true, "Answer is Required!"],
    },
  },
  { _id: false }
);

const skillGapsSchema = new Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill Gap is Required!"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
  },
  { _id: false }
);

const preparationPlainSchema = Schema(
  {
    day: {
      type: Number,
      required: [true, "no. of days is Required!"],
    },
    focus: {
      type: String,
      required: [true, "Focus is Required!"],
    },
    tasks: [{ type: String, required: [true, "Tasks are Required!"] }],
  },
  { _id: false }
);

const interviewReportSchema = new Schema(
  {
    jobDescription: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGaps: [skillGapsSchema],
    preparationPlain: [preparationPlainSchema],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);

export const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);
