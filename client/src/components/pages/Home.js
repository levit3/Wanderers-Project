import React from "react";
import { Link } from "react-router-dom";
// import './Home.css'

//Complete home page
const Home = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h3>Welcome to our Travel Review Website. </h3>
        <Link to={"/login"}>
          <button className="login-btnn">Login/Signup</button>
        </Link>
        <h1>Featured travels</h1>
      </header>
      <section className="featured-books">
        <div className="book-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a1/Lord_Rings_Two_Towers.jpg"
            alt="Book Cover"
          />
          <h3>The Lord of the Rings</h3>
          <p>J.R.R. Tolkien</p>
        </div>
        <div className="book-card">
          <img
            src="https://books.google.co.ke/books/content?id=fUoQFk8aTCkC&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U1QZuk83HucHFgY1TEjC_DKdW7BcQ&w=1280"
            alt="Book Cover"
          />
          <h3>The Grapes of Wrath</h3>
          <p>John Steinbeck</p>
        </div>
        <div className="book-card">
          <img
            src="https://books.google.co.ke/books/content?id=htkrUmjuNjoC&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3Y3sJQ4uVmocOXQ0EQxsd3eUyxpg&w=1280"
            alt="Book Cover"
          />
          <h3>The Inferno</h3>
          <p>Dante Alighieri</p>
        </div>
      </section>
      <footer className="contact">
        <h2>Contact Us</h2>
        <p>Email: deezbuuks@gmail.com</p>
        <p>Phone: +1234567899</p>
      </footer>
    </div>
  );
};

export default Home;
