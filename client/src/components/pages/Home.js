import ReadMore from "./ReadMore";
import "./Home.css";
import NavBar from "../NavBar";
import { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_SERVER_API;

const Home = () => {
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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

  useEffect(() => {
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

    fetchSessionData();
  });

  const introText =
    "Welcome to Wanderers! Discover amazing travel destinations and read reviews from fellow travelers.";

  return (
    <>
      <div>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <div className="landing-page">
          <header className="header">
            <p className="intro-text">
              {introText.split("").map((char, index) => (
                <span
                  key={index}
                  style={{ animationDelay: `${index * 0.01}s` }}
                >
                  {char}
                </span>
              ))}
            </p>
          </header>
          <section className="featured-destination">
            <div className="box-card">
              <img
                src="https://www.tripsavvy.com/thmb/qoEzJSOSZsriZLdLeFOWpDI09-A=/2119x1415/filters:fill(auto,1)/GettyImages-5012969201-f35ade933e6c4114829401bf607160ea.jpg"
                alt="Seychelles island img"
              />
              <h3>Seychelles Beaches, Seychelles</h3>
              <div className="rating">{renderStars(4.5)}</div>
              <ReadMore>
                Located approximately 930 miles off the eastern coast of Africa
                in the heart of the Indian Ocean, the Seychelles are a slice of
                heaven right here on Earth. They are beautiful year-round but
                the best time to visit is in spring or fall when the islands are
                less crowded and the weather is nearly perfect. The archipelago
                is made up of 115 tiny islands that are well known for their
                soft, white-sand beaches, crystal clear waters, and unique
                wildlife. It is a wonderful destination for travelers looking to
                escape the hustle and bustle of daily life for a while,
                providing a serene refuge to be as active or relaxed as they
                choose.
              </ReadMore>
            </div>

            <div className="destination-card">
              <img
                src="https://cdn.audleytravel.com/4082/2913/79/8003731-nairobi.jpg"
                alt="Nairobi city img"
              />
              <h3>Nairobi, Kenya</h3>
              <div className="rating">{renderStars(5)}</div>
              <ReadMore>
                Nairobi, the capital city of Kenya, is a vibrant metropolis that
                combines modernity with rich history and natural beauty. It
                serves as the main gateway to the rest of Kenya and is a
                bustling hub for business, culture, and wildlife. It is known
                for its diverse population, with residents from various ethnic
                backgrounds, making it a melting pot of cultures. This diversity
                is reflected in the city’s food, art, music, and festivals.
              </ReadMore>
            </div>

            <div className="destination-card">
              <img
                src="https://i.pinimg.com/originals/92/b3/d6/92b3d6c3767bc22b6387b514415b2f9b.jpg"
                alt="Table Mountain img"
              />
              <h3>Table Mountain, South Africa</h3>
              <div className="rating">{renderStars(4)}</div>
              <ReadMore>
                Table Mountain, a prominent flat-topped mountain overlooking the
                city of Cape Town in South Africa, is one of the most iconic
                landmarks in the country. It stands at approximately 1,085
                meters (3,558 feet) above sea level and is a UNESCO World
                Heritage Site. Known for its stunning panoramic views, diverse
                flora and fauna, and unique geological features, Table Mountain
                is a must-visit destination for nature lovers and adventure
                seekers.
              </ReadMore>
            </div>
          </section>
        </div>
        <footer className="contact">
          <h2>Contact Us</h2>
          <p>Email: wanderers.info@gmail.com</p>
          <p>Phone: +25411456789</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
