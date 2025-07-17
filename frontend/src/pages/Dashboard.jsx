import { useState, useEffect } from "react";
import API from "../api/api.js";
import JobForm from "../components/JobForm";
import JobCard from "../components/JobCard";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchJobs = async () => {
    const res = await API.get("/job");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-heading">Job Applications</h1>
      </header>

      <button
        className="add-job-btn"
        onClick={() => setShowModal(true)}
        aria-label="Add new job"
      >
        ＋
      </button>

      <div className="job-list-grid">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} onChange={fetchJobs} />
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <JobForm
              onAdd={() => {
                fetchJobs();
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
