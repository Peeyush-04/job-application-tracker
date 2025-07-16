import API from "../api/api.js";

export default function JobCard({ job, onChange }) {
  const handleDelete = async () => {
    await API.delete(`/job/${job._id}`);
    onChange();
  };

  const updateStatus = async (newStatus) => {
    await API.put(`/job/${job._id}`, { status: newStatus });
    onChange();
  };

  return (
    <div className="border p-4 rounded">
      <h3 className="text-lg font-bold">{job.role} @ {job.company}</h3>
      <p>Status: {job.status}</p>
      <div className="space-x-2 mt-2">
        {["IN-REVIEW", "SUCCESS", "REJECTED"].map((s) => (
          <button key={s} onClick={() => updateStatus(s)} className="bg-gray-200 px-2 py-1">{s}</button>
        ))}
        <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1">Delete</button>
      </div>
    </div>
  );
}
