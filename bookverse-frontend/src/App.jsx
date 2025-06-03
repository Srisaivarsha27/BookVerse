import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import "./styles/global.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:title" element={<BookDetails />} />

      </Routes>
    </Router>
  );
};

export default App;
