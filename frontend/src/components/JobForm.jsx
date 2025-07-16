import { useState } from "react";
import API from "../api/api.js";

export default function JobForm({ onAdd }) {
  const [form, setForm] = useState({ company: "", role: "", status: "APPLIED" });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/job", form);
    setForm({ company: "", role: "", status: "APPLIED" });
    onAdd();
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="border p-2 w-full" />
      <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="border p-2 w-full" />
      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="border p-2 w-full">
        <option>APPLIED</option>
        <option>IN-REVIEW</option>
        <option>SUCCESS</option>
        <option>REJECTED</option>
      </select>
      <button className="bg-green-500 text-white px-4 py-2">Add Job</button>
    </form>
  );
}
