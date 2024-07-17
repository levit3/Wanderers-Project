// Login.js
import React, { useState, useContext } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { userContext } from "./context/logincontext";
import NavBar from "../NavBar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(userContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const userData = await response.json();
      console.log("Registration successful:", userData);
      navigate("/travelguides");
    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="form-container-login" onSubmit={handleSubmit}>
        <p className="title">Welcome back</p>
        <form className="form">
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage("");
            }}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
            required
          />
          {errorMessage && (
            <p style={{ color: "red", margin: "2px", fontSize: "14px" }}>
              {errorMessage}
            </p>
          )}
          <button className="form-btn">Log in</button>
        </form>
        <p className="sign-up-label">
          Don't have an account?
          <a className="sign-up-link" href="/signup">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
