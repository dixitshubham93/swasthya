

import './SearchBar.css'
import { useEffect } from 'react';
import Typed from 'typed.js';
import HospitalSearch from  './HospitalSearch';
// import { useState } from 'react';

const SearchBar = () => {


  useEffect(() => {
    // Initialize Typed.js
    const options = {
      strings: [
        "with Ease",
        "Anytime",
        "Anywhere",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    };

    const typed = new Typed(".role", options);

    // Cleanup on component unmount
    return () => {
      typed.destroy();
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <div className="bgsrc">
        <div className="hero-section-heading hero-section-sub-heading">
          Book an Appointment&nbsp;<span className="role"></span>
        </div>
        <div className="search-container">
        <HospitalSearch/>
        </div>
      </div>
      
    </div>
  );
};

export default SearchBar;
