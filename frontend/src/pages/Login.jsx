import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" className="border p-2 w-full" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" className="border p-2 w-full mt-2" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">Login</button>
    </form>
  );
}
