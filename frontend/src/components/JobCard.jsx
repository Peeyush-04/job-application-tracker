import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api.js";

export default function JobCard({ job, onChange }) {
  const fileInputRef = useRef();
  const [file, setFile]      = useState(null);
  const [uploading, setUploading] = useState(false);

  const statusClasses = {
    APPLIED:   "status-applied",
    "IN-REVIEW": "status-review",
    SUCCESS:   "status-success",
    REJECTED:  "status-rejected",
  };

  const updateStatus = async s => { await API.put(`/job/${job._id}`, { status: s }); onChange(); };
  const handleDelete = async ()  => { await API.delete(`/job/${job._id}`); onChange(); };

  const onFileSelect = e => setFile(e.target.files[0]);
  const uploadResume = async () => {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("resume", file);
    await API.post(`/job/${job._id}/upload-resume`, fd);
    setFile(null);
    onChange();
    setUploading(false);
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h3 className="job-title">
            {job.role} <span className="job-company">@ {job.company}</span>
          </h3>
          <span className={`status-label ${statusClasses[job.status]}`}>
            {job.status}
          </span>
        </div>
        <Link to={`/job/${job._id}`} className="view-timeline-link">
          View Timeline
        </Link>
      </div>

      <div className="resume-section">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileSelect}
          className="hidden"
        />
        <button onClick={() => fileInputRef.current.click()} className="resume-upload-link">
          {file ? file.name : "Choose File"}
        </button>
        {file && (
          <button onClick={uploadResume} disabled={uploading} className="upload-confirm-button">
            {uploading ? "Uploading…" : "Upload"}
          </button>
        )}
        {job.resume && (
          <a
            href={`http://localhost:5000/uploads/${job.resume}`}
            target="_blank"
            rel="noreferrer"
            className="resume-view-link"
          >
            View Resume
          </a>
        )}
      </div>

      <div className="job-actions">
        {["IN-REVIEW","SUCCESS","REJECTED"].map(s => (
          <button key={s} onClick={() => updateStatus(s)} className="status-button">
            Mark as {s}
          </button>
        ))}
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>
    </div>
  );
}
