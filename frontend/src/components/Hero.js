// src/components/Hero.js

import React from 'react';
import heroData from '../data/heroData';
import '../styles/Hero.css';

const Hero = () => {
  const {
    name,
    title,
    description,
    resumeLink,
    contactAnchor
  } = heroData;

  return (
    <section id="about" className="hero-section text-center">

      {/* 💡 NEW: Animated Background Elements Container */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Change the middle section of Hero.js */}
      <div className="container-md position-relative" style={{ zIndex: 2 }}>
        <h2 className="display-6 text-secondary">Hi, I'm {name}.</h2>
        <h1 className="display-3 fw-bold mb-4">{title}</h1>

        {/* Re-introducing the Author's Note style */}
        <div className="author-note-wrapper mb-5">
          <div className="author-note">
            <div className="note-header">
              <i className="fas fa-pen-nib me-2"></i> Author's Note
            </div>
            <p className="note-body">
              {description}
            </p>
          </div>
        </div>

        <div className="hero-actions my-4">
          {/* Keep your new visible buttons exactly as they are */}
          <a href={resumeLink} target="_blank" rel="noopener noreferrer"
            className="btn btn-primary btn-lg me-3 pulsing-glow">
            <i className="fas fa-download me-2"></i> Resume
          </a>

          <a href={contactAnchor}
            className="btn btn-outline-dark btn-lg secondary-btn">
            <i className="fas fa-envelope me-2"></i> Contact
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;