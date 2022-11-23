import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Socials from "./components/Socials";
import Header from "./components/Header";

function App() {
  return (
    <div className='mainDiv'>
      <Router>
        <nav>
          <Link to='/'> ZACH BLOG (guides and stuff)</Link>
        </nav>
        <Socials />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
