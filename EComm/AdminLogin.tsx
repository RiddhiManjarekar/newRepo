import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";

const AdminLogin: React.FC = () => {
  const { dispatch } = useAppContext();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    if (credentials.username === "admin" && credentials.password === "admin123") {
      dispatch({ type: "SET_ADMIN", payload: true });
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
