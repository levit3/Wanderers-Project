import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./About.css";

const About = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="about-page">
      <NavBar />
      <div className="about-container">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? "Go back" : "X"}
        </button>{" "}
        <h1>About Wanderers</h1>
        <p>
          Welcome to Wanderers, your ultimate travel destination review website!
        </p>
        <h2>Our Vision</h2>
        <p>
          We envision a world where travel is accessible, enjoyable, and
          enriching for everyone. Wanderers aims to be the go-to resource for
          travelers seeking genuine insights and recommendations for
          destinations around the globe.
        </p>
        <h2>What We Offer</h2>
        <ul>
          <li>
            <strong>Comprehensive Reviews:</strong> Detailed reviews from
            travelers who have experienced destinations first-hand, covering
            everything from accommodation and dining to local attractions and
            hidden gems.
          </li>
          <li>
            <strong>Traveler Tips:</strong> Practical advice and tips to help
            you navigate new destinations, manage your travel budget, and make
            the most of your journey.
          </li>
          <li>
            <strong>User-Friendly Platform:</strong> An intuitive and
            easy-to-navigate website that allows you to quickly find the
            information you need, compare destinations, and plan your perfect
            trip.
          </li>
          <li>
            <strong>Community Engagement:</strong> A vibrant community of
            travelers sharing their experiences, photos, and stories, fostering
            a sense of connection and inspiration.
          </li>
        </ul>
        <h2>Why Choose Wanderers?</h2>
        <ul>
          <li>
            <strong>Authenticity:</strong> Our reviews are written by real
            travelers, ensuring you get honest and accurate information.
          </li>
          <li>
            <strong>Diversity:</strong> Discover a wide range of perspectives
            and experiences from travelers of all backgrounds.
          </li>
          <li>
            <strong>Up-to-Date Information:</strong> Stay informed with the
            latest travel news, trends, and destination updates.
          </li>
          <li>
            <strong>Supportive Community:</strong> Join a community that shares
            your passion for travel and adventure.
          </li>
        </ul>
        <h3 className="end">
          Wanderers – Where Every Journey Begins with a Story.
        </h3>
      </div>
      <footer className="contact">
        <h2>Contact Us</h2>
        <p>Email: wanderers.info@gmail.com</p>
        <p>Phone: +25411456789</p>
      </footer>
    </div>
  );
};

export default About;
