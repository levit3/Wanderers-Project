// TravelGuideList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./List.css";
import Search from "./Search";

const TravelGuideList = () => {
  const [guides, setGuides] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [displayItem, setDisplayItem] = useState([]);

  useEffect(() => {
    fetchGuides();
    fetchSessionData();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch("/destinations");
      const data = await response.json();
      setGuides(data);
      setDisplayItem(data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  const fetchSessionData = async () => {
    try {
      const response = await fetch("/check-session");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log(data);
      setLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  function handleSearch(event) {
    const filteredGuides = guides.filter((guide) =>
      guide.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setDisplayItem(filteredGuides);
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="guide-list">
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Search handleSearch={handleSearch} />
      <div className="card-container">
        <main id="main">
          {displayItem.map((guide) => (
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
>>>>>>> 42f66edf768b9ffc35ac9841b4ef254d4800149f
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
