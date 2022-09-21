import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import React, { useState } from "react";

function App() {
  return (
    <Router>
      <nav>
        <Link to='/'> ZATS BLOG (guides and stuff) </Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
