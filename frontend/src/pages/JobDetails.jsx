import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Timeline from '../components/Timeline';
import axios from 'axios';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/job/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJob(res.data);
      } catch (err) {
        console.error('Failed to fetch job details', err);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-2">{job.company}</h1>
      <p className="text-gray-700 mb-4">{job.role}</p>

      {job.resume && (
        <a
          href={`http://localhost:5000/uploads/${job.resume}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          View Resume
        </a>
      )}

      <h2 className="mt-6 mb-2 text-xl font-semibold">Timeline</h2>
      {job.history?.length ? (
        <Timeline history={job.history} />
      ) : (
        <p className="text-gray-500">No updates yet.</p>
      )}
    </div>
  );
};

export default JobDetails;
