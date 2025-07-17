import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      await register(form);
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <div className="register-container">
      {error && <div className="register-error">{error}</div>}

      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-heading">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="register-input"
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}
