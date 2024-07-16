// Register.js
import React, { useState } from "react";
import "./Auth.css";
import Login from "./Login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const api = "http://127.0.0.1:5555";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5555/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const userData = await response.json();
      setMessages("Successfully registered");
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  /*** Handle Same username/email ***/

  return (
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
        <button className="form-btn">Sign up</button>
      </form>
      {{ messages } && <p style={{ color: "green" }}>messages</p>}
      <p className="sign-up-label">
        Already have an account?
        <a className="sign-up-link" href="/login">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
