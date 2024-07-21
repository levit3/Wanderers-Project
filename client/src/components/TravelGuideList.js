import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import MyPosts from "./MyPosts";
import "./List.css";

const API_URL = process.env.REACT_APP_SERVER_API;

const TravelGuideList = () => {
  const [guides, setGuides] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [displayItem, setDisplayItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [notification, setNotification] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    fetchGuides();
    fetchSessionData();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch(`${API_URL}/destinations`, {
        credentials: "include",
      });
      const data = await response.json();
      setGuides(data);
      setDisplayItem(data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  const fetchSessionData = async () => {
    try {
      const response = await fetch(`${API_URL}/check-session`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/my-posts`, {
        credentials: "include",
      });
      const data = await response.json();
      setMyPosts(data);
      setShowMyPosts(true);
    } catch (error) {
      console.error("Error fetching my posts:", error);
    }
  };

  const handleCreatePost = () => {
    setShowForm(true);
    setShowMenu(false);
  };

  const handleViewPosts = () => {
    fetchMyPosts();
    setShowMenu(false);
  };

  const handleEditPost = async (id, updatedPost) => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });
      if (response.ok) {
        fetchMyPosts();
      }
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        fetchMyPosts();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    const filteredGuides = guides.filter((guide) =>
      guide.name.toLowerCase().includes(value)
    );

    if (filteredGuides.length === 0) {
      setNotification(
        "The item you searched did not match any in our database."
      );
    } else {
      setNotification("");
    }

    setDisplayItem(filteredGuides);
  };

  // Validate form inputs
  const validateForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (!values.location) {
      errors.location = "Location is required";
    }
    if (values.image && values.image.size > 7340032) {
      errors.image = "File size should be less than 7MB";
    }
    if (
      values.image &&
      !["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
        values.image.type
      )
    ) {
      errors.image = "Unsupported file format";
    }
    if (
      values.imageUrl &&
      !/^https?:\/\/[\w-]+(\.[\w-]+)+([/?].*)?$/.test(values.imageUrl)
    ) {
      errors.imageUrl = "Invalid URL";
    }
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("image", values.image);
    formData.append("link", values.imageUrl);

    try {
      const response = await fetch(`${API_URL}/destinations`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }

      const data = await response.json();
      setGuides((prevGuides) => [...prevGuides, data]);
      setDisplayItem((prevItems) => [...prevItems, data]);
      resetForm();
      setNotification("Destination added successfully.");
      setShowForm(false);
    } catch (error) {
      setNotification(error.message);
    }

    setSubmitting(false);
  };

  return (
    <>
      <div className="guide-list">
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <div className="card-container">
          <form
            className="search-form"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchValue}
              onChange={handleSearch}
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>

          {loggedIn && showForm && (
            <Formik
              initialValues={{
                name: "",
                description: "",
                location: "",
                image: null,
                imageUrl: "",
              }}
              validate={validateForm}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form className="new-destination-form">
                  <h3>Add New Destination</h3>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Destination Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="form-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Destination Description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="form-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <Field
                      type="text"
                      name="location"
                      placeholder="Destination Location"
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="form-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image Upload:</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="form-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <small style={{ fontSize: "15px" }}>
                      Preferably for a wide image
                    </small>
                    <Field
                      type="text"
                      name="imageUrl"
                      placeholder="Image URL"
                    />
                    <ErrorMessage
                      name="imageUrl"
                      component="div"
                      className="form-error"
                    />
                  </div>
                  <button
                    type="submit"
                    className="post-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Posting..." : "Post"}
                  </button>
                </Form>
              )}
            </Formik>
          )}
          <main id="main">
            {notification && <p className="notification">{notification}</p>}

            {displayItem.map((guide) => (
              <div key={guide.id} className="destination-card">
                <img
                  src={`https://wanderers-project.onrender.com/api/static/uploads/Untitled design (${
                    guide.id - 1
                  }).png`}
                  alt="imge"
                />
                <h2>{guide.name}</h2>
                <p>{guide.description}</p>
                <Link to={`/travelguides/${guide.id}`}>
                  Find out more
                  <span className="material-symbols-outlined">
                    arrow_right_alt
                  </span>
                </Link>
              </div>
            ))}
          </main>
        </div>
        {loggedIn && (
          <div className="fab-container">
            <button className="fab" onClick={() => setShowMenu(!showMenu)}>
              +
            </button>
            {showMenu && (
              <div className="fab-menu">
                <button
                  className="fab-menu-item"
                  onClick={handleCreatePost}
                  title="Create Post"
                >
                  ✏️
                </button>
                <button
                  className="fab-menu-item"
                  onClick={handleViewPosts}
                  title="View My Posts"
                >
                  📄
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {showMyPosts && (
        <MyPosts
          posts={myPosts}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
          onClose={() => setShowMyPosts(false)}
        />
      )}
      <footer className="contact">
        <h2>Contact Us</h2>
        <p>Email: wanderers.info@gmail.com</p>
        <p>Phone: +25411456789</p>
      </footer>
    </>
  );
};

export default TravelGuideList;
