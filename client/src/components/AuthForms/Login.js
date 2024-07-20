// Login.js
import React, { useState, useContext } from "react";
import "./Auth.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";

const FormSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum of 8 characters required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div>
      <NavBar />
      <div className="form-container-login">
        <p className="title">Welcome back</p>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={FormSchema}
          onSubmit={async (values) => {
            try {
              const response = await fetch("/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
              });
              if (!response.ok) {
                throw new Error("Login failed");
              }
              const userData = await response.json();
              setSuccessMessage("Login successful. Redirecting...");
              setTimeout(() => navigate("/travelguides"), 2000);
            } catch (error) {
              setErrorMessage(error.message);
            }
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form className="form" onSubmit={handleSubmit}>
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
                style={{ color: "red", fontSize: "5px", margin: 0 }}
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
                style={{ color: "red", fontSize: "5px", margin: 0 }}
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
                Log in
              </button>
            </Form>
          )}
        </Formik>
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
