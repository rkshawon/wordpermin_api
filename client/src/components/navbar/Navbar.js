import React from 'react';
import "./navbar.css"
import { Link, useLocation } from "react-router-dom";

function Navbar() {
      //assigning location variable
      const location = useLocation();

      //destructuring pathname from location
      const { pathname } = location;
  
      //Javascript split method to get the name of the path in array
      const splitLocation = pathname.split("/");
  return <div className="navbar">
      <div className="home">
        <Link to="/" className='text-link'><h3 className={splitLocation[1] === "" ? "activeNav" : ""}>Normal Drill</h3></Link>
      </div>
      <div className="advanced">
        <Link to="/advance" className='text-link'><h3 className={splitLocation[1] === "advance" ? "activeNav" : ""}>Advanced Drill</h3></Link>
      </div>
      <div className="alphabetical">
      <Link to="/alphabetical" className='text-link'><h3 className={splitLocation[1] === "alphabetical" ? "activeNav" : ""}>Alphabetical Drill</h3></Link>
    </div>
      <div className="common">
        <Link to="/commonword" className='text-link'><h3 className={splitLocation[1] === "commonword" ? "activeNav" : ""}>Common 100</h3></Link>
      </div>
      <div className="unique">
        <Link to="/uniqueword" className='text-link'><h3 className={splitLocation[1] === "uniqueword" ? "activeNav" : ""}>Unique 50</h3></Link>
      </div>
    </div>
}

export default Navbar;
