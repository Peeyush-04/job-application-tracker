import React from "react";

export default function ResumeViewer({ fileName }) {
  if (!fileName) {
    return <p className="resume-placeholder">No resume uploaded.</p>;
  }

  const fileUrl = `http://localhost:5000/uploads/${fileName}`;

  return (
    <div className="resume-viewer">
      <a href={fileUrl} target="_blank" rel="noreferrer" className="resume-link">
        View Uploaded Resume
      </a>
    </div>
  );
}
