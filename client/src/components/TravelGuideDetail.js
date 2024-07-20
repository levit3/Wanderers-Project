// TravelGuideDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import "./Detail.css";
import NavBar from "./NavBar";

const API_URL = process.env.SERVER_API_URL;

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "star filled" : "star"}>
        ★
      </span>
    );
  }
  return stars;
};

const TravelGuideDetail = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [user, setUser] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`/${API_URL}/check-session`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUser(data);
        setLoggedIn(true);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchSessionData();
  }, []);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await fetch(`${API_URL}/destinations/${id}`);
        const data = await response.json();
        setGuide(data);
        setReviews(data.reviews);
        if (data.reviews.length > 0) {
          let summation = data.reviews.reduce(
            (accumulator, r) => accumulator + r.rating,
            0
          );
          let avg = summation / data.reviews.length;
          setAverage(Math.round(avg * 10) / 10);
        }
      } catch (error) {
        console.error("Error fetching guide:", error);
      }
    };

    fetchGuide();
  }, [id]);

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete review.");
      }
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
  };

  const handleScroll = () => {
    const descriptionSection = document.querySelector(".dest-description");
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
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="spinner-text">Please wait! Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container-fluid-md">
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <h3 className="dest-header">{guide.name}</h3>
        <h5 className="dest-location">{guide.location}</h5>
        <img
          className="img-fluid rounded-bottom image"
          src={guide.link}
          alt="imge"
          width="100%"
        />
        <div className="scroll-arrow" onClick={handleScroll}>
          &#8595;
        </div>
      </div>
      <div
        className="container border pt-2 rounded dest-description"
        style={{ backgroundColor: "#eff1f5" }}
      >
        <div className="container">
          <div
            className="row border rounded pe-5 mb-3"
            style={{ backgroundColor: "#23262f", color: "#eff1f5" }}
          >
            <div className="col-9 text-description fs-5 pt-4">
              <p>{guide.description}</p>
            </div>
            <div className="col-3 text-end pe-5  pb-3 ">
              <p className="text-end average">{average} </p>
              <p className="text-end fs-5 avg">Avg</p>
            </div>
          </div>
          <div>
            {reviews.map((g) => {
              const date = new Date(g.date);
              const formattedDate = date.toDateString();
              return (
                <div key={g.id} className="d-flex justify-content-evenly">
                  <div className="card my-4 w-4 " style={{ width: "50vw" }}>
                    <h5 className="card-header d-flex justify-content-between">
                      <div>{g.user.username}</div>
                      <div className="fs-6">{formattedDate}</div>
                    </h5>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <p className="card-text">{g.comment}</p>
                        <span>{renderStars(g.rating)}</span>
                      </div>
                    </div>
                    {user.id === g.user.id && (
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2 mx-2">
                        <button
                          className="btn btn-outline-info"
                          onClick={() => handleEdit(g)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(g.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="review-container d-flex justify-content-center">
            <ReviewForm
              setReviews={setReviews}
              reviews={reviews}
              guide={guide}
              editingReview={editingReview}
              setEditingReview={setEditingReview}
              user={user}
            />
          </div>
        </div>
      </div>
      <footer className="contact">
        <h2>Contact Us</h2>
        <p>Email: wanderers.info@gmail.com</p>
        <p>Phone: +25411456789</p>
      </footer>
    </div>
  );
};

export default TravelGuideDetail;
