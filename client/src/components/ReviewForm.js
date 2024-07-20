import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const API_URL = process.env.SERVER_API_URL;

const ReviewForm = ({
  setReviews,
  reviews,
  guide,
  editingReview,
  setEditingReview,
  user,
}) => {
  const [hasReviewed, setHasReviewed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (editingReview) {
      setRating(editingReview.rating);
      setComment(editingReview.comment);
    } else {
      setRating("Rating");
      setComment("");
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

  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    rating: yup
      .string()
      .required("Rating is required")
      .oneOf(["1", "2", "3", "4", "5"], "Invalid rating"),
    comment: yup.string().required("Comment is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (editingReview) {
      try {
        if (values.username === user.username) {
          const response = await fetch(
            `${API_URL}/reviews/${editingReview.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                comment: values.comment,
                rating: values.rating,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to update review.");
          }
          const updatedReview = await response.json();
          setReviews(
            reviews.map((r) => (r.id === editingReview.id ? updatedReview : r))
          );
          setEditingReview(null);
          resetForm();
        } else {
          setErrorMessage(
            "Failed to update review. Ensure your username is correct"
          );
        }
      } catch (error) {
        console.error("Error updating review:", error);
      }
    } else {
      if (values.username === user.username) {
        try {
          const response = await fetch(`${API_URL}/reviews`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              rating: values.rating,
              comment: values.comment,
              destination_id: guide.id,
              user_id: user.id,
            }),
          });
          if (!response.ok) {
            throw new Error("You need to be logged in to provide a review.");
          }
          const data = await response.json();
          setReviews([...reviews, data]);
          resetForm();
        } catch (error) {
          console.error("Error posting review:", error.message);
        }
      } else {
        setErrorMessage(
          "Failed to post review. Check if you have logged in and confirm your username is correct"
        );
      }
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        username: user ? user.username : "",
        rating: rating ? rating : "",
        comment: comment ? comment : "",
      }}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, handleChange, handleSubmit, values }) => (
        <Form
          className="border p-3 rounded mb-2"
          style={{ width: "64vw", backgroundColor: "#23262f", color: "white" }}
          onSubmit={handleSubmit}
        >
          <h4>Write your review</h4>
          <div className="row">
            <div className="col">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <Field
                type="text"
                className="form-control col-auto"
                id="username"
                placeholder="Username"
                value={values.username}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMessage("");
                }}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error"
                style={{ color: "red", fontSize: "15px", margin: 0 }}
              />
            </div>
            <div
              className="col input-group pt-3 mt-3"
              style={{ height: "2vh" }}
            >
              <span className="input-group-text" htmlFor="rating">
                <i className="bi bi-star"></i>
              </span>
              <Field
                as="select"
                className="form-select"
                id="rating"
                name="rating"
                onChange={handleChange}
                value={values.rating}
              >
                <option value="Rating">Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Field>
              <ErrorMessage
                name="rating"
                component="div"
                className="error"
                style={{ color: "red", fontSize: "15px", margin: 0 }}
              />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="comment" className="form-label">
              Review
            </label>
            <Field
              as="textarea"
              className="form-control"
              id="comment"
              rows="3"
              placeholder="Review..."
              value={values.comment}
              onChange={handleChange}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className="error"
              style={{ color: "red", fontSize: "15px", margin: 0 }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={hasReviewed && !editingReview}
          >
            {!editingReview ? "Submit" : "Edit"}
          </button>
          {hasReviewed && !editingReview && (
            <small style={{ color: "#ced2d8" }}>
              <br />
              You can only write a review once
            </small>
          )}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
