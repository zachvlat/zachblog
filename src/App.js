import "./App.css";
import Home from "./components/Home";
import Socials from "./components/Socials";
import Header from "./components/Header";

function App() {
  return (
    <div className='mainDiv'>
      <Header />
      <Socials />
      <Home />
    </div>
  );
}

export default App;
