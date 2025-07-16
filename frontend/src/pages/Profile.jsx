import { useState, useContext } from "react";
import API from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const uploadResume = async () => {
    const formData = new FormData();
    formData.append("resume", file);
    await API.post(`/user/upload-resume`, formData);
    alert("Resume uploaded");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block mt-4" />
      <button onClick={uploadResume} className="bg-blue-600 text-white px-4 py-2 mt-2">Upload Resume</button>
    </div>
  );
}
