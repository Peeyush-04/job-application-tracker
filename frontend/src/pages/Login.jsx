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
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-heading">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="login-input"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="login-input"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit" className="login-button">Login</button>
    </form>
  );
}
