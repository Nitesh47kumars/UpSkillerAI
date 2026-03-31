import React, { useState } from "react";
import "../style/home.scss";

import { MdOutlineWorkOutline } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { LuCloudUpload } from "react-icons/lu";

const Home = () => {
  const [resumeName, setResumeName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setResumeName(file.name);
  };

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
                onChange={handleFileChange}
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
        <button className="cta-btn">⭐ Generate My Interview Strategy</button>
      </div>
    </main>
  );
};

export default Home;
