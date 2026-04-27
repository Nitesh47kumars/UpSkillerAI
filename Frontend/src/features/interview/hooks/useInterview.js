import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
} from "../services/interview.api";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const {interviewId} = useParams();

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider!");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resume,
  }) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resume,
      });
      setReport(response.interviewReport);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };

  const getReportById = async ({interviewId}) => {
    setLoading(true);
    let response = null;
    try {
      response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };

  const getAllReports = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getAllInterviewReports();
      setReports(response.interviewReports);
      return response.interviewReports
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    return response.interviewReports;
  };

  const getResumePdf = async (interviewReportId) =>{
    setLoading(true)
    let response = null

    try{
      response = await generateResumePdf({interviewReportId});
      const url = window.URL.createObjectURL(new Blob([response],{type: "application/pdf"}))
      const link = document.createElement("a")
      link.href = urllink.setAttribute("download", `resume_${interviewReportId}.pdf`)
      document.body.appendChild(link)
      link.click()
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    {if(interviewId){
      getReportById(interviewId);
    }else{
      getAllReports()
    }}
  },[])

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getAllReports,
    getResumePdf
  };
};
