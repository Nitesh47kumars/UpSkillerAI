import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_GENAPI_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 to 100 indicating how well the candidate's profile matches the job describe"
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The Technical questions can be asked in the Interview"),
        intention: z
          .string()
          .describe(
            "The Intention of the interviewer behind asking the questions"
          ),
        answer: z
          .string()
          .describe(
            "How to answer this questions, what points to cover, what approach to take etc."
          ),
      })
    )
    .describe(
      "Technical questions that can be ask in an interview along with their intention"
    ),

  BehavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The Behavioral questions can be asked in the Interview"
          ),
        intention: z
          .string()
          .describe(
            "The Intention of the interviewer behind asking the questions"
          ),
        answer: z
          .string()
          .describe(
            "How to answer this questions, what points to cover, what approach to take etc."
          ),
      })
    )
    .describe(
      "Behavioral questions that can be ask in an interview along with their intention"
    ),

  skillGap: z
    .array(
      z.object({
        skill: z.array().describe("The skill which candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The Severity of skill, i.e. how important skill is"),
      })
    )
    .describe("The Skiil which candidate is lacking along with severity"),

  preparation: z
    .array(
      z.object({
        day: z
          .number()
          .describe(
            "the day Number in the preparation plain, starting from 1"
          ),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plain, e.g. data structures, system design, mock interview, etc"
          ),
        task: z
          .string()
          .describe(
            "List of task to be done on this day ro follow the preparation plan, e.g. read specific book, etc"
          ),
      })
    )
    .describe(
      "A Day wise preparation plan for candidate to follow along with focus and tasks"
    ),
});

async function generateInterviewReport(
  resume,
  selfdescribe,
  jobdescribe
) {
  const prompt = `Generate an interview Report for a candidate with the following Details:
    Resume: ${resume}
    Self describe: ${selfdescribe}
    Job describe: ${jobdescribe}
    `;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  console.log("Gemini Result: ", JSON.parse(response.text))
}

export default generateInterviewReport;