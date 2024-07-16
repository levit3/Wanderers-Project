import React from "react";
// import App from "./components/App";
import Home from "./components/pages/Home";
import Login from "./components/AuthForms/Login";
import Register from "./components/AuthForms/Register";
import TravelGuideDetail from "./components/TravelGuideDetail";
import TravelGuideList from "./components/TravelGuideList";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { UserProvider } from "./components/AuthForms/context/logincontext";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
  { path: "/travelguides", element: <TravelGuideList /> },
  { path: "/travelguides/:id", element: <TravelGuideDetail /> },
]);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
