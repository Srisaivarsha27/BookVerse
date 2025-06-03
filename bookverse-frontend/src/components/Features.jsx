import "../styles/features.css";

const Features = () => {
  const features = [
    { title: "Author-Based", desc: "Find books by your favorite authors.", icon: "✍️" },
    { title: "Genre-Based", desc: "Browse books based on genres.", icon: "📚" },
    { title: "Pacing Information", desc: "See if a book is fast, medium, or slow-paced.", icon: "⏱️" },
    { title: "Ratings & Reviews", desc: "Check book ratings before reading.", icon: "⭐" }
  ];

  return (
    <section className="features">
      <h2>📖 Features</h2>
      <div className="feature-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
