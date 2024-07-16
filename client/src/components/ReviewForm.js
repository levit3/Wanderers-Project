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
    <form
      className="border p-3 rounded mb-2"
      style={{ width: "64vw", backgroundColor: "#23262f", color: "white" }}
      onSubmit={handleSubmit}
    >
      <h4>Write your review</h4>
      <div class="row">
        <div className="col">
          <label for="usernameInput" class="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control col-auto"
            id="usernameInput"
            placeholder="Username"
          />
        </div>
        <div className="col input-group pt-3 mt-3" style={{ height: "2vh" }}>
          <span class="input-group-text" for="inputGroupSelect01">
            <i class="bi bi-star"></i>
          </span>
          <select
            className="form-select"
            aria-label="Default select example"
            id="inputGroupSelect01"
          >
            <option selected>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="mt-3">
        <label for="textarea" class="form-label">
          Review
        </label>
        <textarea
          class="form-control"
          id="textarea"
          rows="3"
          placeholder="Review..."
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary mt-2">
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
