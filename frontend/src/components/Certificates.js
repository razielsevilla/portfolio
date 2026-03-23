// src/components/Certificates.js

import React, { useState, useRef } from 'react';
import certificateData from '../data/certificateData';
import '../styles/Certificates.css';

const Certificates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const scrollContainerRef = useRef(null);

  const filteredCerts = certificateData.filter(cert =>
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="certificates" className="certificates-section container-fluid">

      {/* Main Content (z-index 2) */}
      <div className="cert-content-wrapper position-relative" style={{ zIndex: 2 }}>

        <div className="text-center mb-4">
          <h2 className="display-4 section-title">
            <span className="title-decoration">#</span> Certificates <span className="title-decoration">#</span>
          </h2>
          <p className="text-muted">
            Unlocked Credentials ({certificateData.length})
          </p>

          <div className="search-container mt-3">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Filter..."
              className="cert-search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="carousel-wrapper">
          <button className="carousel-btn left-btn" onClick={() => scroll('left')}>
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="cert-carousel" ref={scrollContainerRef}>
            {filteredCerts.map(cert => (
              <div key={cert.id} className="cert-card-wrapper">
                <div className="cert-card">

                  <div className="cert-content">
                    <div className="icon-box">
                      <i className={`${cert.icon} fa-3x`}></i>
                    </div>
                    <h5 className="cert-title">{cert.title}</h5>
                    <div className="cert-issuer-tag">{cert.issuer}</div>
                  </div>

                  <div className="cert-overlay">
                    <div className="overlay-content">
                      <p className="cert-date">Issued: {cert.date}</p>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer"
                        className="btn btn-sm btn-view-credential">
                        Verify <i className="fas fa-external-link-alt ms-1"></i>
                      </a>
                    </div>
                  </div>

                  <div className="corner-decor top-left"></div>
                  <div className="corner-decor bottom-right"></div>
                </div>
              </div>
            ))}

            {filteredCerts.length === 0 && (
              <div className="text-center w-100 text-muted">No credentials found.</div>
            )}
          </div>

          <button className="carousel-btn right-btn" onClick={() => scroll('right')}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Certificates;