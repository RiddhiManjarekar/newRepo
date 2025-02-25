import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";

const UserLogin: React.FC = () => {
  const { dispatch } = useAppContext();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch({ type: "SET_USER", payload: credentials });
    navigate("/");
  };

  return (
    <div className="login-container">
      <h1>User Login</h1>
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

export default UserLogin;
