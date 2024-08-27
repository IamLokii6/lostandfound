// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Adjust the import path

function Navbar() {
  return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/FrontPage">
          <img src="logo.png" alt="logo" className="navbar-logo" /> {/* Adjust logo height as needed */}
          Lost and Found
        </Link> {/* Link to the SearchPage */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link custom-button me-2 rounded-pill" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
