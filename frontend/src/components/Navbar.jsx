// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-logo">JobTracker</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/profile"   className="nav-link">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login"    className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
      {user && (
        <button onClick={logout} className="logout-button">Logout</button>
      )}
    </nav>
  );
}
