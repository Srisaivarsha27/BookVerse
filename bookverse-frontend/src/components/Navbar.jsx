import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">📚 BookVerse</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/genres">Add</Link></li>
        <li><Link to="/authors">Edit</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
