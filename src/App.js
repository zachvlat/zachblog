import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className='mainDiv'>
      <Router>
        <nav>
          <Link to='/'> ZATS BLOG (guides and stuff)</Link>
        </nav>
        <div className='socials'>
          <a href='https://github.com/zachvlat'>
            <img
              src='https://img.icons8.com/nolan/40/github.png'
              alt='github'
            />
          </a>
          <a href='https://www.linkedin.com/in/zvlatakis/'>
            <img
              src='https://img.icons8.com/nolan/40/1A6DFF/C822FF/linkedin-circled.png'
              alt='linkedin'
            />
          </a>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
