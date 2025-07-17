import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
      <p className="profile-text">Name: {user?.name}</p>
      <p className="profile-text">Email: {user?.email}</p>
    </div>
  );
}
