// Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
// import api from '../../services/api';
const api = "http://127.0.0.1:5555";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", { username, password });
      // Handle successful login (e.g., store token in local storage)
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>

        <div className="register-link">
          <p>Don't have an account yet?</p>
          <Link to="/register" className="register-btn">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
