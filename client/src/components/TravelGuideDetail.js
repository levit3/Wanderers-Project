// TravelGuideDetail.js
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import "./Detail.css";
import NavBar from "./NavBar";
import { userContext } from "./AuthForms/context/logincontext";

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
  const [warning, setWarning] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch("/check-session");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchSessionData();
  }, []);

  useEffect(() => {
    fetchGuide();
  }, [id]);

  const fetchGuide = async () => {
    try {
      const response = await fetch(`/destinations/${id}`);
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

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container-fluid-md">
        <NavBar />
        <h3 className="dest-header">{guide.name}</h3>
        <h5 className="dest-location">{guide.location}</h5>
        <img
          className="img-fluid rounded-bottom image"
          src={guide.link}
          alt="image"
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
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
    </div>
  );
};

export default TravelGuideDetail;
