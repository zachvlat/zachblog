import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

function Header() {
  return (
    <nav className='navTitle'>
      <Link to='/'> ZACH BLOG (guides and stuff)</Link>
    </nav>
  );
}

export default Header;
