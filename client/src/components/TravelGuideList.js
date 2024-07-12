// TravelGuideList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    <div className="guide-list">
      <h3>Travel Guides</h3>
      <div className="card-container">
        {guides.map((guide) => (
          <div key={guide.id} className="card">
            <h4>{guide.name}</h4>
            <img
              src={`http://127.0.0.1:5555/static/uploads/Untitled design (${
                guide.id - 1
              }).png`}
              alt="image"
            />
            <Link to={`/travelguides/${guide.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelGuideList;
