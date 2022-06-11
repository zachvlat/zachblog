import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";

function App() {
  const [isAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <nav>
        <Link to='/'> Zats Blog (guides and stuff) </Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
