import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api.js";
import Timeline from "../components/Timeline";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    API.get(`/job/${id}`).then(res => setJob(res.data));
  }, [id]);

  if (!job) return <p>Loading…</p>;

  return (
    <div className="job-details-container">
      <Link to="/dashboard">&larr; Back</Link>
      <h1 className="job-details-company">{job.company}</h1>
      <p className="job-details-role">{job.role}</p>
      {job.resume && (
        <a
          href={`http://localhost:5000/uploads/${job.resume}`}
          target="_blank"
          rel="noreferrer"
          className="job-details-resume-link"
        >
          Download Resume
        </a>
      )}
      <h2 className="job-details-timeline-heading">Timeline</h2>
      {job.history?.length
        ? <Timeline history={job.history} />
        : <p className="job-details-no-history">No updates yet.</p>
      }
    </div>
  );
}
