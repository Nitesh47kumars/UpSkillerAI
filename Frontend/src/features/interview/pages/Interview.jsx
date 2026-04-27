import { useState, useEffect, useRef } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router";
import { SiGooglegemini } from "react-icons/si";
import Loading from "../Components/Loading"

const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="22" y1="12" x2="2" y2="12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);
const IconChevron = () => (
  <svg
    className="q-chevron"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────

function QuestionCard({ question, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className={`q-card${open ? " open" : ""}`}>
      <div className="q-header" onClick={() => setOpen((o) => !o)}>
        <span className="q-num">Q{index + 1}</span>
        <span className="q-text">{question.question}</span>
        <IconChevron />
      </div>
      {open && (
        <div className="q-body">
          <div className="tag intention">Intention</div>
          <p>{question.intention}</p>
          <div className="tag answer">Model Answer</div>
          <p>{question.answer}</p>
        </div>
      )}
    </div>
  );
}

function QuestionList({ questions }) {
  return (
    <div>
      {questions.map((q, i) => (
        <QuestionCard key={i} question={q} index={i} />
      ))}
    </div>
  );
}

function RoadMap({ days }) {
  return (
    <div className="roadmap-grid">
      {days.map((d, index) => (
        <div className="day-card" key={d.Day}>
          <div className="day-header">
            <span className="day-badge">Day {index + 1} </span>
            <span className="day-focus">{d.focus}</span>
          </div>
          <div className="day-task">{d.task}</div>
        </div>
      ))}
    </div>
  );
}

function ScoreRing({ score }) {
  const circumference = 283;
  const offset = circumference * (1 - score / 100);
  const ringRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = offset;
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [offset]);

  return (
    <div className="score-section">
      <div className="score-label">Match Score</div>
      <div className="score-ring-wrap">
        <svg className="ring-svg" viewBox="0 0 100 100">
          <circle className="ring-bg" cx="50" cy="50" r="45" />
          <circle
            className="ring-fill"
            cx="50"
            cy="50"
            r="45"
            ref={ringRef}
            style={{ strokeDashoffset: circumference }}
          />
          <g className="ring-text-group">
            <text className="ring-score" x="50" y="54" textAnchor="middle">
              {score}
            </text>
            <text className="ring-pct" x="50" y="67" textAnchor="middle">
              %
            </text>
          </g>
        </svg>
        <div className="score-desc">Strong match for this role</div>
      </div>
    </div>
  );
}

function SkillGaps({ gaps }) {
  return (
    <div>
      <div className="gaps-label">Skill Gaps</div>
      <div>
        {gaps.map((g, i) => (
          <span key={i} className={`gap-pill ${g.severity}`}>
            {g.skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Nav config ───────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions", Icon: IconCode },
  { id: "behavioral", label: "Behavioral Questions", Icon: IconChat },
  { id: "roadmap", label: "Road Map", Icon: IconMap },
];

// ─── Main Component ───────────────────────────────────────────
export default function Interview() {
  const [activeSection, setActiveSection] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const {interviewId} = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById({ interviewId });
    }
  }, [interviewId]);

  if (loading || !report) {
    return <Loading/>
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-label">
          <h3>Sections</h3>
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <div
              key={id}
              className={`nav-item${activeSection === id ? " active" : ""}`}
              onClick={() => setActiveSection(id)}
            >
              <Icon />
              {label}
            </div>
          ))}
        </div>
        <button style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem"}} onClick={()=>getResumePdf({interviewReportId :interviewId})} className="button primary-button">
          <SiGooglegemini />
          Download AI Resume
        </button>
      </nav>

      {/* Main */}
      <main className="main">
        {activeSection === "technical" && (
          <div className="section active">
            <div className="section-header">
              <span className="section-title">Technical Questions</span>
              <span className="count-badge">
                {report.technicalQuestions.length} questions
              </span>
            </div>
            <QuestionList questions={report.technicalQuestions} />
          </div>
        )}

        {activeSection === "behavioral" && (
          <div className="section active">
            <div className="section-header">
              <span className="section-title">Behavioral Questions</span>
              <span className="count-badge">
                {report.behavioralQuestions.length} questions
              </span>
            </div>
            <QuestionList questions={report.behavioralQuestions} />
          </div>
        )}

        {activeSection === "roadmap" && (
          <div className="section active">
            <div className="section-header">
              <span className="section-title">Road Map</span>
              <span className="count-badge">
                {report.preparationPlan.length} days
              </span>
            </div>
            <RoadMap days={report.preparationPlan} />
          </div>
        )}
      </main>

      {/* Right Panel */}
      <aside className="right-panel">
        <ScoreRing score={report.matchScore} />
        <SkillGaps gaps={report.skillGap} />
      </aside>
    </div>
  );
}
