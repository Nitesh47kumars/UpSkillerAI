import React, { useRef, useState } from "react";
import "../style/home.scss";

import { MdOutlineWorkOutline } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { LuCloudUpload } from "react-icons/lu";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import Loading from "../Components/Loading"

const Home = () => {
  const { loading, generateReport, reports } = useInterview();

  const [resumeName, setResumeName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");

  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resume = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resume,
    });
    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return <Loading/>
  }

  return (
    <main className="home">
      <div className="container">
        {/* HEADER */}
        <div className="header">
          <h1>
            Create Your Custom <span>Interview Plan</span>
          </h1>
          <p>
            Let our AI analyze your job requirements and profile to build a
            winning strategy.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="card">
          {/* LEFT */}
          <div className="left panel">
            <div className="panel-header">
              <div>
                <MdOutlineWorkOutline />
                <h3>Target Job Description</h3>
              </div>
              <span className="badge">REQUIRED</span>
            </div>

            <textarea
              placeholder="Paste the full job description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* RIGHT */}
          <div className="right panel">
            <div className="panel-header">
              <div>
                <IoPerson />
                <h3>Your Profile</h3>
              </div>
            </div>

            {/* Upload Box */}
            <label className="upload-box">
              <input
                type="file"
                hidden
                accept=".pdf, .docs,.docx"
                ref={resumeInputRef}
              />
              <LuCloudUpload />
              <p>Click to upload or drag & drop</p>
              <small>PDF or DOCX (Max 5MB)</small>

              {resumeName && <span className="file-name">{resumeName}</span>}
            </label>

            <div className="divider">OR</div>

            {/* Self Description */}
            <textarea
              placeholder="Describe your experience, skills, etc..."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
            />

            <div className="info-box">
              Either a Resume or Self Description is required.
            </div>
          </div>
        </div>

        {/* FOOTER BUTTON */}
        <button onClick={handleGenerateReport} className="cta-btn">
          ⭐ Generate My Interview Strategy
        </button>

        {reports.length > 0 && (
          <section className="recent-reports">
            <h1>Recent Interview Plans</h1>
            <ul className="reports-list">
              {reports.map((r) => (
                <li
                  key={r._id}
                  className="report-item"
                  onClick={() => navigate(`/interview/${r._id}`)}
                >
                  <h3>{r.title || "Untitled"}</h3>
                  <p>
                    Generate on {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    MatchScore:{" "}
                    <span
                      className={
                        r.matchScore >= 80
                          ? "score-high"
                          : r.matchScore >= 60
                          ? "score-md"
                          : "score-low"
                      }
                    >
                      {r.matchScore}
                    </span>
                  </p>{" "}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
};

export default Home;
