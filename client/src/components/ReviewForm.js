import React, { useState } from "react";

const ReviewForm = ({ setReviews, reviews, guide }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

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
          //user id goes here
        }),
      });
      const data = await response.json();
      setReviews([...reviews, data]);
    } catch (error) {
      console.error("Error posting review:", error);
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
    </form>
  );
};

export default ReviewForm;
