// Register.js
import React, { useState } from "react";
import "./Auth.css";
// import api from '../../services/api';
const api = "http://127.0.0.1:5555";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/register", {
        username,
        email,
        password,
      });
      // Handle successful registration (e.g., navigate to login page)
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch("http://127.0.0.1:5555/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, email, password }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Registration failed");
  //     }
  //     const userData = await response.json();
  //     console.log("Registration successful:", userData);
  //     // Handle successful registration (e.g., redirect to login page)
  //   } catch (error) {
  //     console.error("Error registering:", error);
  //     // Handle error (e.g., display error message to user)
  //   }
  // };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        Register
      </button>
    </form>
  );
};

export default Register;
