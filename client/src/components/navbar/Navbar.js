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
        <Link to="/" className='text-link'><h3 className={splitLocation[1] === "" ? "activeNav" : ""}>𝙽𝚘𝚛𝚖𝚊𝚕</h3></Link>
      </div>
      <div className="advanced">
        <Link to="/advance" className='text-link'><h3 className={splitLocation[1] === "advance" ? "activeNav" : ""}>𝙰𝚍𝚟𝚊𝚗𝚌𝚎𝚍</h3></Link>
      </div>
      <div className="alphabetical">
      <Link to="/alphabetical" className='text-link'><h3 className={splitLocation[1] === "alphabetical" ? "activeNav" : ""}> 𝙰𝚕𝚙𝚑𝚊𝚋𝚎𝚝𝚒𝚌</h3></Link>
    </div>
      <div className="common">
        <Link to="/commonword" className='text-link'><h3 className={splitLocation[1] === "commonword" ? "activeNav" : ""}>𝙲𝚘𝚖𝚖𝚘𝚗</h3></Link>
      </div>
      <div className="unique">
        <Link to="/uniqueword" className='text-link'><h3 className={splitLocation[1] === "uniqueword" ? "activeNav" : ""}>𝚄𝚗𝚒𝚚𝚞𝚎</h3></Link>
      </div>
    </div>
}

export default Navbar;
