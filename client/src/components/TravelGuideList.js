// TravelGuideList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./List.css";
// import api from '../services/api';

const api = "http://127.0.0.1:5555";

const TravelGuideList = () => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/destinations");
      const data = await response.json();
      setGuides(data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  return (
    <div className="guide-list py-3">
      <NavBar />
      <div className="card-container">
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
  );
};

export default TravelGuideList;
