import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./List.css";

const API_URL = process.env.SERVER_API_URL;

const TravelGuideList = () => {
  const [guides, setGuides] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [displayItem, setDisplayItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchGuides();
    fetchSessionData();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch(`${API_URL}/destinations`);
      const data = await response.json();
      setGuides(data);
      setDisplayItem(data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  const fetchSessionData = async () => {
    try {
      const response = await fetch(`${API_URL}/check-session`);

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
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    const filteredGuides = guides.filter((guide) =>
      guide.name.toLowerCase().includes(value)
    );

    if (filteredGuides.length === 0) {
      setNotification(
        "The item you searched did not match any in our database."
      );
    } else {
      setNotification("");
    }

    setDisplayItem(filteredGuides);
  }

  return (
    <>
      <div className="guide-list">
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <div className="card-container">
          <form
            className="search-form"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchValue}
              onChange={handleSearch}
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>
          <main id="main">
            {notification && <p className="notification">{notification}</p>}

            {displayItem.map((guide) => (
              <div key={guide.id} className="destination-card">
                <img
                  src={`https://wanderers-project.onrender.com/api/static/uploads/Untitled design (${
                    guide.id - 1
                  }).png`}
                  alt="imge"
                />
                <h2>{guide.name}</h2>
                <p>{guide.description}</p>
                <Link to={`/travelguides/${guide.id}`}>
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
      <footer className="contact" style={{ bottom: "0px" }}>
        <h2>Contact Us</h2>
        <p>Email: wanderers.info@gmail.com</p>
        <p>Phone: +25411456789</p>
      </footer>
    </>
  );
};

export default TravelGuideList;
