import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_GENAPI_KEY,
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `You are an expert technical interviewer and career coach.
Analyze the candidate's resume, self-description, and job description.
Return ONLY a valid JSON object. No markdown, no code blocks, no explanation.

{
  "matchScore": <number 0-100>,
  "technicalQuestions": [
    {
      "question": "<question text>",
      "intention": "<why interviewer asks this>",
      "answer": "<how to answer with key points>"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "<question text>",
      "intention": "<why interviewer asks this>",
      "answer": "<how to answer with key points>"
    }
  ],
  "skillGap": [
    {
      "skill": "<skill name>",
      "severity": "<low|medium|high>"
    }
  ],
  "preparationPlan": [
    {
      "day": <number>,
      "focus": "<focus area>",
      "task": ["<task 1>", "<task 2>"]
    }
  ]
}

Rules:
- 4 technical questions
- 2-3 behavioral questions
- all skill gaps with severity
- 5 day preparation plan, tasks must be an array of strings
- all keys must be lowercase exactly as shown above

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json", // no responseJsonSchema — this was causing the conflict
    },
  });

  const raw = JSON.parse(response.text);

  return {
    matchScore: raw.matchScore,
    technicalQuestions: raw.technicalQuestions.map((item) => ({
      question: item.question || "",
      intention: item.intention || "",
      answer: item.answer || "",
    })),
    behavioralQuestions: raw.behavioralQuestions.map((item) => ({
      question: item.question || "",
      intention: item.intention || "",
      answer: item.answer || "",
    })),
    skillGap: raw.skillGap.map((item) => ({
      skill: item.skill || "",
      severity: item.severity || "low",
    })),
    preparationPlan: raw.preparationPlan.map((item) => ({
      day: Number(item.day) || 1,
      focus: item.focus || "",
      task: Array.isArray(item.task)
        ? item.task.flat()
        : Array.isArray(item.tasks)
        ? item.tasks.flat()
        : [item.task || item.tasks || ""],
    })),
  };
}

export default generateInterviewReport;
