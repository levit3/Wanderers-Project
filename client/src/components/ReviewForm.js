import React, { useContext, useState, useEffect } from "react";

const ReviewForm = ({
  setReviews,
  reviews,
  guide,
  editingReview,
  setEditingReview,
  user,
}) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [error, setErrorMessage] = useState("");

  useEffect(() => {
    if (editingReview) {
      setComment(editingReview.comment);
      setRating(editingReview.rating);
    } else {
      setComment("");
      setRating("Rating");
    }
  }, [editingReview]);

  useEffect(() => {
    if (user) {
      const userReview = reviews.find((review) => review.user_id === user.id);
      if (userReview) {
        setHasReviewed(true);
      } else {
        setHasReviewed(false);
      }
    }
  }, [reviews, user]);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const date = new Date();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingReview) {
      try {
        const response = await fetch(`/reviews/${editingReview.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment, rating }),
        });
        if (!response.ok) {
          throw new Error("Failed to update review.");
        }
        const updatedReview = await response.json();
        setReviews(
          reviews.map((r) => (r.id === editingReview.id ? updatedReview : r))
        );
        setEditingReview(null);
      } catch (error) {
        console.error("Error updating review:", error);
      }
    } else {
      if (username === user.username) {
        try {
          const response = await fetch("/reviews", {
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
          setRating("Rating");
          setComment("");
          setUsername("");
        } catch (error) {
          console.error("Error posting review:", error);
          setErrorMessage("You need to be logged in to provide a review.");
        }
      } else {
        setErrorMessage("Unauthorized access.");
      }
    }
  };

  return (
    <form
      className="border p-3 rounded mb-2"
      style={{ width: "64vw", backgroundColor: "#23262f", color: "white" }}
      onSubmit={handleSubmit}
    >
      <h4>Write your review</h4>
      <div className="row">
        <div className="col">
          <label for="usernameInput" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control col-auto"
            id="usernameInput"
            placeholder="Username"
            defaultValue={user ? user.username : ""}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage("");
            }}
          />
        </div>
        <div className="col input-group pt-3 mt-3" style={{ height: "2vh" }}>
          <span className="input-group-text" for="inputGroupSelect01">
            <i className="bi bi-star"></i>
          </span>
          <select
            className="form-select"
            aria-label="Default select example"
            id="inputGroupSelect01"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
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
        <label for="textarea" className="form-label">
          Review
        </label>
        <textarea
          className="form-control"
          id="textarea"
          rows="3"
          placeholder="Review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      {
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={hasReviewed && !editingReview}
        >
          {!editingReview ? "Submit" : "Edit"}
        </button>
      }
      {hasReviewed && !editingReview && (
        <small style={{ color: "#ced2d8" }}>
          <br />
          You can only write a review once
        </small>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ReviewForm;
