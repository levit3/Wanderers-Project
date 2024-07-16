import React, { useContext, useState } from "react";
import { userContext } from "./AuthForms/context/logincontext";

const ReviewForm = ({ setReviews, reviews, guide }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const { user } = useContext(userContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5555/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          comment: comment,
          destination_id: guide.id,
          user_id: user.id,
        }),
      });
      if (!response.ok) {
        throw new Error("You need to be logged in to provide a review.");
      }
      const data = await response.json();
      setReviews([...reviews, data]);
      setRating("");
      setComment("");
    } catch (error) {
      console.error("Error posting review:", error);
      setErrorMessage("You need to be logged in to provide a review.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Submit Review</button>
      {errorMessage && (
        <p style={{ color: "red" }}>Please log in to provide a review.</p>
      )}
    </form>
  );
};

export default ReviewForm;
