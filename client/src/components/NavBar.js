import React from "react";
import backpackIcon from "../images/backpack2.svg";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ setLoggedIn, loggedIn }) {
  const navigate = useNavigate();

  function handleLogout() {
    const logout = async () => {
      const response = await fetch("/logout", {
        method: "DELETE",
      });
      setLoggedIn(false);
      navigate("/");
    };
    logout();
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top navbar-dark"
        style={{ backgroundColor: "#252932" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand px-4 text-white">
            <img
              className="image-fluid me-2 "
              src={backpackIcon}
              alt="Backpack"
              width="30"
              height="30"
            />
            Wanderers
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/travelguides">
                  Reviews
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">
                  About
                </Link>
              </li>
            </ul>
            {loggedIn ? (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <button
                    className="btn nav-link text-white btn-outline-danger "
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <button className="btn nav-link text-white btn-outline-success ">
                      Login/Signup
                    </button>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
