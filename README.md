# Wanderers-Project

## Travel Guide Application

The Travel Guide application is a comprehensive web platform that allows users to view 
and explore travel guides and to also add their reviews for destinations arounf the World

 # Table of Contents
 1. Overview
 2. Backend(Python/Flask)
 3. Application Components

   . Header and Navigation
   . Home Page
   . Travel Guide Detail Page
   . Review Submission
   . Authentication
   . Private Routes and Authorization
   . API Integration

 4. Workflow Summary
 5. Installations
 6. Usage
 7. Contributing
 8. License

# Overview

The Travel Guide and Review System is a web application designed to provide users with
 access to detailed travel guides and the ability to submit reviews. It leverages a 
 Flask backend to handle data storage, authentication, and API interactions, while the 
 frontend is built using React to ensure a dynamic and responsive user experience.

# Backend(Python/Flask)

## Overview

The backend of the Travel Guide Application is built using Python and Flask framework. It provides 
a RESTful API for managing user authentication, travel guides, and reviews. SQLAlchemy is used for 
database management, and JWT (JSON Web Tokens) for secure authentication.

# Setup
1. Clone the Repository

   git clone git@github.com:levit3/Wanderers-Project.git
   cd Wanderers-Project/backend

2. Create a Virtual Environment
   
   python -m venv venv
   source venv/bin/activate   # For Windows use `venv\Scripts\activate`

3. Install Dependancies
   
   pip install -r requirements.txt

4. Database Configuration

   . Configure your database connection string in backend/utils/db.py.
   . Initialize the database and apply migrations:

    flask db init
    flask db migrate
    flask db upgrade

5. Run the Flask Application
   
   flask run

6. Access API Documentation
  
  .Once the Flask application is running, you can access     the    Swagger UI for API documentation at http://localhost:5000/api/docs.

  ## Project Structure
  /backend
  │
  ├── app/
  │   ├── models/
  │   ├── routes/
  │   ├── services/
  │   ├── utils/
  │   └── migrations/
  │
  ├── requirements.txt
  └── README.md

  # Components
  ## Models:
    . User: Manages user information such as username,      password hash, email.

    . TravelGuide: Represents travel guides with attributes    like title, description, location, author 
    (linked to User model), timestamps.

    . Review: Represents reviews for destinations with attributes like rating, comments, associated TravelGuide,
     author (linked to User model), timestamps.

## Routes
  . auth.py: Handles user authentication and authorization (register, login, logout).

  . travel_guide.py: Manages CRUD operations for TravelGuide model (create, read, update, delete guides).

  . review.py: Manages CRUD operations for Review model (create, read, update, delete reviews).

## Services 

  . user_service.py: Provides helper functions for user-related operations.

  . travel_guide_service.py: Contains business logic for handling travel guide operations (e.g., search by location or category).

  . review_service.py: Contains business logic for handling review operations (e.g., rating calculation).

  ## Database Integration 
    . db.py: Initializes and configures the SQLAlchemy database connection.
    . migrations/: Directory for SQLAlchemy migrations.
 
 ## Authentication and Authorization:
    
    . Implements JWT (JSON Web Tokens) for secure user authentication.
    . Provides role-based authorization to restrict access to certain routes (admin vs. regular users).


 # Frontend

 ## Application Components

 ## Header and Navigation
   The Header component provides essential navigation links ('Home', 'Profile', 'Login', 'Register') 
   for seamless navigation throughout the application. Users can easily access different sections
    based on their preferences.

## Home Page
File: 'Home.js'
The Home Page displays a list of travel guides fetched from the backend (TravelGuideList.js).
 Each guide in the list is clickable, directing users to its detailed view
  (TravelGuideDetail.js).

## TravelGuide Detail Page
File: 'TravelGuideDetail.js'
This page renders comprehensive information about a selected travel guide,
 including attributes like title, description, and optionally, reviews associated with the guide.

## review Submission
File: 'ReviewForm.js'
On the Travel Guide Detail page, users can submit reviews via the ReviewForm component.
 Reviews are sent to the Flask backend via API requests (api.js), which manages storing them in the database.

# Authentication
 Files:'Login.js' and 'Register.js'
Users can authenticate by logging in (Login.js) or registering for a new account (Register.js). 
Authentication requests are handled by the Flask backend (api.js), which verifies credentials
 and manages user sessions using JWT (JSON Web Tokens) or similar mechanisms.

 # Private Routes and Authorization
 File:'PrivateRoute.js'
 PrivateRoute.js protects routes that require authentication, such as user profile (UserProfile.js) 
 or routes for creating/editing guides and reviews. It ensures that only authenticated users can 
 access sensitive functionalities and redirects to the login page if necessary.

# API Integration
File:'api.js'
Manages communication with the Flask backend's API endpoints (/guides, /reviews, /login, /register). 
Handles HTTP requests (GET, POST) to fetch data (guides, reviews) and submit user actions (login, register, 
review submission), ensuring seamless data flow between the frontend and backend.

# Workflow Summary
  . User Interaction: Users navigate through the application using header navigation links,
   accessing travel guides and submitting reviews.
  . Data Fetching: Components asynchronously fetch data from the Flask backend to display 
  dynamic content based on user interactions.
  . State Management: Uses React's state and possibly context API (useEffect, useState) to manage 
  component state, ensuring responsive updates to user interactions and data changes.
  . Authentication and Authorization: Implements secure access to protected routes and user-specific 
  functionalities using JWT tokens or session-based authentication managed by the Flask backend.

  ## Installation
  To run the Travel Guide and Review System locally, follow these steps:

1. Clone the repository
   
   git clone git@github.com:levit3/Wanderers-Project.git
   cd Wanderers-Project/backend

 2. Install dependancies

   npm install

3. Start the development server
   
   npm start

4. Ensure the Flask backend is running and properly configured 
  to handle API requests from the frontend.

  ## Additional Features
     . Search Bar: Allows users to search for travel guides and reviews by location, keyword, or category.
     . Interactive Map Component: Displays destinations and guides on a map with clickable markers.
     . Social Sharing Buttons: Enables users to share content on social media platforms directly from the application.
     . Rating and Comment Components: Display and allow users to rate guides and reviews, leave comments, and engage in discussions.
    .  Responsive Design: Ensure the application is fully responsive for various devices (desktop, tablet, mobile).
    .  Notifications Component: Alerts users to new activity (e.g., new reviews, comments on their guides).

  ## Usage
  Once the application is running, open your web browser and navigate to http://localhost:5555 
  (or the specified port) to use the Travel Guide and Review System. Explore travel guides, submit
   reviews, and interact with the features seamlessly.

# Deployment and Maintenance
# Deployment
1. Backend Deployment
   . Deploy the Flask backend to a platform like Heroku or AWS EC2.
   . Ensure database configurations and environment variables are properly set.

2. Frontend Deployment
   . Deploy the React frontend to services like Netlify or Vercel.
   . Optimize assets and enable continuous deployment (CI/CD).


## Monitoring and Maintenance
  .  Monitor application performance using tools like New Relic or platform-specific monitoring.
   . Gather user feedback through analytics and surveys to prioritize ongoing improvements and bug fixes.



 # Contributing
  Contributions are welcome! If you'd like to contribute to the Travel Guide and Review System, please 
  fork the repository, make your changes, and submit a pull request. Be sure to follow the existing coding style and guidelines.





  


















 

  
