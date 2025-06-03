import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Surf. Read. Repeat.</h1>
        <p>Discover books, explore genres, and connect with authors.</p>
        <button className="explore-btn" onClick={() => window.scrollTo({ top: 1000, behavior: "smooth" })}>
          Start Exploring
        </button>
      </div>
    </section>
  );
};

export default Hero;
