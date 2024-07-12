// TravelGuideDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
// import api from '../services/api';
const api = "http://127.0.0.1:5555";

const TravelGuideDetail = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    fetchGuide();
  }, [id]);

  const fetchGuide = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/destinations/${id}`);
      const data = await response.json();
      setGuide(data);
    } catch (error) {
      console.error("Error fetching guide:", error);
    }
  };

  if (!guide) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{guide.name}</h2>
      <p>{guide.description}</p>
      {guide.reviews.map((g) => {
        return (
          <div key={g.id}>
            <p>Rating: {g.rating}</p>
            <p>Comment: {g.comment}</p>
          </div>
        );
      })}
      <ReviewForm />
    </div>
  );
};

export default TravelGuideDetail;
