// Register.js
import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const formSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <div className="form-container-signup">
        <p className="title">Sign up</p>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={formSchema}
          onSubmit={async (values) => {
            try {
              const response = await fetch("/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
              });
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Registration failed");
              }
              setSuccessMessage("Successfully registered. Redirecting...");
              setTimeout(() => navigate("/login"), 1500);
            } catch (error) {
              setErrorMessage(error.message);
              console.log(error.message);
            }
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form className="form" onSubmit={handleSubmit}>
              <Field
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error"
                style={{ color: "red", fontSize: "15px" }}
              />
              <Field
                type="text"
                name="username"
                className="input"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error"
                style={{ color: "red", fontSize: "15px" }}
              />
              <Field
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error"
                style={{ color: "red", fontSize: "15px" }}
              />
              {errorMessage && (
                <p style={{ color: "red", margin: "2px", fontSize: "14px" }}>
                  {errorMessage}
                </p>
              )}
              {successMessage && (
                <p style={{ color: "green", margin: "2px", fontSize: "14px" }}>
                  {successMessage}
                </p>
              )}
              <button className="form-btn" type="submit">
                Sign up
              </button>
              <p className="sign-up-label">
                Already have an account?
                <a className="sign-up-link" href="/login">
                  Login
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
