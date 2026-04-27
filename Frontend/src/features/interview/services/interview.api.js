import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/**
 * 
 * @description Api to Generate interview Report
 */
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resume,
}) => {
  const formData = new FormData();

  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resume);

  const response = await api.post("/api/interview", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * 
 * @description Api to get Sepecific Interview Report by ID
 */
export const getInterviewReportById = async ({interviewId}) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);
  return response.data;
};

/**
 * 
 * @description Api to get All Interview Reports of a User
 */
export const getAllInterviewReports = async () => {
  const response = await api.get(`/api/interview`);
  return response.data;
};

/**
 * 
 * @description Service to generate resume pdf based on user self description, resume and job description
 */
export const generateResumePdf = async ({interviewReportId}) =>{
  const response  = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null,{
    responseType: "blob"
  })

  return response.data
}