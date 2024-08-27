import React from 'react';
import backgroundImage from 'C:/Users/lokes/Desktop/original2/l-f/frontend/src/image/lost-and-found-software.webp'; // Import your image
import './FrontPage.css'; // Import your CSS file
import Navbar from './Navbar';

function FrontPage() {
  return (
    <>
    <Navbar />
    <div className="search-container" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <button type="button">Search</button>
      </div>
    </div>

    </>
  );
}

export default FrontPage;

