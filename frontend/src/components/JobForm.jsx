import { useState } from "react";
import API from "../api/api.js";

export default function JobForm({ onAdd }) {
  const [company, setCompany] = useState("");
  const [role, setRole]       = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/job", { company, role });
    setCompany("");
    setRole("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input
        type="text"
        placeholder="Company"
        className="form-input"
        value={company}
        onChange={e => setCompany(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Role"
        className="form-input"
        value={role}
        onChange={e => setRole(e.target.value)}
        required
      />
      <button type="submit" className="submit-button">Add Job</button>
    </form>
  );
}
