import { useState, useEffect } from "react";
import API from "../api/api.js";
import JobForm from "../components/JobForm.jsx";
import JobCard from "../components/JobCard.jsx";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await API.get("/job");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <JobForm onAdd={fetchJobs} />
      <h2 className="text-lg font-semibold mt-6">Jobs</h2>
      <div className="space-y-4 mt-2">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} onChange={fetchJobs} />
        ))}
      </div>
    </div>
  );
}
