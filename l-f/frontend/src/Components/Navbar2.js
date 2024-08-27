import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import { Link } from 'react-router-dom';
function Navbar2() {
  return (<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/main">
                Home
              </Link >
            </li>
            <li className="nav-item">
              <span className="nav-link">Link</span>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </span>
              <ul className="dropdown-menu">
                <li><span className="dropdown-item">Action</span></li>
                <li><span className="dropdown-item">Another action</span></li>
                <li><hr className="dropdown-divider" /></li>
                <li><span className="dropdown-item">Something else here</span></li>
              </ul>
            </li>
            <li className="nav-item">
            <Link className="nav-link active" to="/lost-item">
                Register Lost Item
              </Link>
            </li>
          </ul>
          <span className="navbar-brand">
          <FontAwesomeIcon icon={faUserCircle} /> User
        </span>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar2;
