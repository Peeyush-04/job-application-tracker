import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // On mount, try to fetch current user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/user/me")
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (form) => {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    navigate("/dashboard");
  };

  const register = async (form) => {
    const res = await API.post("/auth/register", form);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Show nothing until auth is initialized
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
