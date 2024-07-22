import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./List.css";

const MyPosts = ({ guide, posts, onEdit, onDelete, onClose }) => {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingValues, setEditingValues] = useState({});

  const startEditing = (post) => {
    setEditingPostId(post.id);
    setEditingValues({
      name: post.name,
      description: post.description,
      location: post.location,
      // imageUrl: guide.imageUrl || "",
    });
  };

  const handleEditSubmit = (values) => {
    onEdit(editingPostId, values);
    setEditingPostId(null);
    setEditingValues({});
  };

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
      !["image/jpeg", "image/png", "image/gif"].includes(values.image.type)
    ) {
      errors.image = "Unsupported file format";
    }
    if (
      values.imageUrl &&
      !/^https?:\/\/[\w-]+(\.[\w-]+)+([/?].*)?$/.test(values.imageUrl)
    ) {
      errors.imageUrl = "Invalid URL";
    }
    return errors;
  };

  return (
    <>
      <div className="my-posts">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h3>My Posts</h3>
        {posts.length === 0 ? (
          <p>No Posts Found.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              {editingPostId === post.id ? (
                <Formik
                  initialValues={editingValues}
                  validate={validateForm}
                  onSubmit={handleEditSubmit}
                >
                  {({ setFieldValue, isSubmitting }) => (
                    <Form className="edit-post-form">
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
                        <label htmlFor="imageUrl">Image URL:</label>
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
                        className="save-button"
                        disabled={isSubmitting}
                      >
                        Save Changes
                      </button>
                    </Form>
                  )}
                </Formik>
              ) : (
                <>
                  <h4>{post.name}</h4>
                  <p>{post.description}</p>
                  <p>{post.location}</p>
                  {/* <img
                    src={`https://wanderers-project.onrender.com/api/static/uploads/Untitled design (${
                      guide.id - 1
                    }).png`}
                    alt="imge"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = guide.link;
                    }}
                  /> */}
                  <button
                    className="edit-buttton"
                    onClick={() => startEditing(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-buttton"
                    onClick={() => onDelete(post.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MyPosts;
