import React from "react";
import backpackIcon from "../images/backpack2.svg";

function NavBar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{ backgroundColor: "#252932" }}
      >
        <div class="container">
          <a class="navbar-brand px-4 text-white" href="/">
            <img
              className="image-fluid me-2 "
              src={backpackIcon}
              alt="Backpack"
              width="30"
              height="30"
            />
            Wanderers
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link active  text-white"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="/travelguides">
                  Reviews
                </a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success text-white" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
