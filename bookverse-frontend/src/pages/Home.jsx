import { Link } from "react-router-dom";
import "../styles/home.css";
import shatterMeImage from "../assets/shatter-me.png"; // Import the image
import ikigaiImage from "../assets/ikigai.png"; 
import cotgImage from "../assets/cotg.png"; 
import dgdtImage from "../assets/dgdt.png"; 
import tgImage from "../assets/twisted.png"; 
import bnbImage from "../assets/bnb.png"; 
import heroImage from "../assets/bookshelf.png"; // Import hero image
import user1 from "../assets/user1.png"; 
import user2 from "../assets/user2.png"; 
import user3 from "../assets/user3.png"; 
import fantasyIcon from "../assets/dragon.gif"; 
import crimeIcon from "../assets/crime.gif"; 
import scifiIcon from "../assets/scifi.gif"; 
import lifeIcon from "../assets/life.gif"; 
import loveIcon from "../assets/love.gif"; 
import adIcon from "../assets/adventure.gif"; 


// Social Media Icons
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; 

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1>📚 Welcome to BookVerse</h1>
          <p>Discover books, explore new genres, and connect with fellow readers.</p>
          <p className="catch-phrase">"Your next great read is just a click away!"</p>
          <button className="cta-btn" onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}>Start Exploring</button>
        </div>
      </section>

      {/* Featured Books Section (Grid Layout) */}
      <section className="featured-books">
        <h2>Featured Books</h2>
        <div className="featured-grid">
          <div className="carousel-item">
            <img src={shatterMeImage} alt="Shatter Me" />
            <p>Shatter Me</p>
          </div>
          <div className="carousel-item">
            <img src={ikigaiImage} alt="Ikigai" />
            <p>Ikigai</p>
          </div>
          <div className="carousel-item">
            <img src={cotgImage} alt="Chalice Of The Gods" />
            <p>Chalice Of The Gods</p>
          </div>
          <div className="carousel-item">
            <img src={dgdtImage} alt="Dead Girls Don't Talk" />
            <p>Dead Girls Don't Talk</p>
          </div>
          <div className="carousel-item">
            <img src={tgImage} alt="Twisted Games" />
            <p>Twisted Games</p>
          </div>
          <div className="carousel-item">
            <img src={bnbImage} alt="Butcher and Blackbird" />
            <p>Butcher and Blackbird</p>
          </div>
        </div>
      </section>

      {/* Genre Section */}
      <section className="genres">
        <h2>Explore by Genre</h2>
        <div className="genre-list">
          <div className="genre-item">
            <img src={fantasyIcon} alt="fantasy" />
            <p>Fantasy</p>
          </div>
          <div className="genre-item">
            <img src={loveIcon} alt="Romance" />
            <p>Romance</p>
          </div>
          <div className="genre-item">
            <img src={crimeIcon} alt="Crime" />
            <p>Crime</p>
          </div>
          <div className="genre-item">
            <img src={scifiIcon} alt="Scifi" />
            <p>Science Fiction</p>
          </div>
          <div className="genre-item">
            <img src={lifeIcon} alt="Lifestyle" />
            <p>Life Style</p>
          </div>
          <div className="genre-item">
            <img src={adIcon} alt="Adventure" />
            <p>Adventure</p>
          </div>
        </div>
      </section>

      {/* Book Stats Section */}
      <section className="book-stats">
        <div className="stats-item">
          <h3>Top Rated Books</h3>
          <p>100+ books with an average rating of 4.5/5.</p>
        </div>
        <div className="stats-item">
          <h3>Total Books</h3>
          <p>Over 2000 books available across various genres.</p>
        </div>
        <div className="stats-item">
          <h3>User Reviews</h3>
          <p>Thousands of reviews from passionate readers!</p>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="user-reviews">
        <h2>What Our Readers Say</h2>
        <div className="reviews-carousel">
          <div className="review-item">
            <img src={user1}alt="User 1" />
            <p>“An amazing platform with so many great books!” - John Doe</p>
          </div>
          <div className="review-item">
            <img src={user2}alt="User 2" />
            <p>“I love how easy it is to find books by genre.” - Jane Smith</p>
          </div>
          <div className="review-item">
            <img src={user3} alt="User 3" />
            <p>“The recommendations are spot on! Highly recommend.” - Sarah Lee</p>
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-top">
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <div className="social-links">
            <Link to="#" className="social-icon">
              <FaFacebook />
            </Link>
            <Link to="#" className="social-icon">
              <FaTwitter />
            </Link>
            <Link to="#" className="social-icon">
              <FaInstagram />
            </Link>
            <Link to="#" className="social-icon">
              <FaLinkedin />
            </Link>
          </div>
        </div>
        <p>&copy; 2025 BookVerse. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
