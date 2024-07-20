// Register.js
import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      const userData = await response.json();
      setMessages("Successfully registered");
    } catch (error) {
      console.error("Error registering:", error);
      setMessages(error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="form-container-signup" onSubmit={handleSubmit}>
        <p className="title">Sign up</p>
        <form className="form">
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
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
            }}
            required
          />
          {{ messages } && <p style={{ color: "red" }}>{messages}</p>}
          <button className="form-btn" onClick={() => navigate(-2)}>
            Sign up
          </button>{" "}
          <p className="sign-up-label">
            Already have an account?
            <a className="sign-up-link" href="/login">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
