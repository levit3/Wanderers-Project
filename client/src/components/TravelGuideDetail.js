// TravelGuideDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import "./Detail.css";
import NavBar from "./NavBar";

const TravelGuideDetail = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchGuide();
  }, [id]);

  const fetchGuide = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/destinations/${id}`);
      const data = await response.json();
      setGuide(data);
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching guide:", error);
    }
  };

  const handleScroll = () => {
    const descriptionSection = document.querySelector(".description");
    window.scrollTo({
      top: descriptionSection.offsetTop,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const image = document.querySelector(".image");
    const onScroll = () => {
      if (image) {
        if (window.scrollY > 300) {
          image.classList.add("hidden");
        } else {
          image.classList.remove("hidden");
        }
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!guide) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container-fluid-md my-0">
        <NavBar />
        <h3 className="Header">{guide.name}</h3>
        <h5 className="Location">{guide.location}</h5>
        <img
          className="img-fluid rounded image"
          src={guide.link}
          alt="image"
          width="100%"
        />
        <div className="scroll-arrow" onClick={handleScroll}>
          &#8595;
        </div>
      </div>
      <div className="description">
        <p>{guide.description}</p>
        {reviews.map((g) => (
          <div key={g.id}>
            <p>Comment: {g.comment}</p>
            <p>Rating: {g.rating}</p>
          </div>
        ))}
        <div className="review-container">
          <ReviewForm setReviews={setReviews} reviews={reviews} guide={guide} />
        </div>
      </div>
    </div>
  );
};

export default TravelGuideDetail;
