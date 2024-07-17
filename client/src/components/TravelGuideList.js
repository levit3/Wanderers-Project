// TravelGuideList.js
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./List.css";
import { userContext } from "./AuthForms/context/logincontext";

const TravelGuideList = () => {
  const [guides, setGuides] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch("/destinations");
      const data = await response.json();
      setGuides(data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };
  console.log(user);

  return (
    <>
      <div className="guide-list">
        <NavBar />

        <div className="card-container">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "50ox" }}
            />
            <button
              className="btn btn-outline-success text-white"
              type="submit"
            >
              Search
            </button>
          </form>
          <main id="main">
            {guides.map((guide) => (
              <div key={guide.id} className="destination-card">
                <img
                  src={`http://127.0.0.1:5555/static/uploads/Untitled design (${
                    guide.id - 1
                  }).png`}
                  alt="image"
                />
                <h2>{guide.name}</h2>
                <p>{guide.description}</p>
                <Link to={`/travelguides/${guide.id}`}>
                  {" "}
                  Find out more
                  <span className="material-symbols-outlined">
                    arrow_right_alt
                  </span>
                </Link>
              </div>
            ))}
          </main>
        </div>
      </div>
      <footer className="contact">
        <h2>Contact Us</h2>
        <p>Email: wanderers.info@gmail.com</p>
        <p>Phone: +25411456789</p>
      </footer>
    </>
  );
};

export default TravelGuideList;
