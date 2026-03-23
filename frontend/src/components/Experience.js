// src/components/Experience.js

import React, { useState } from 'react';
import experienceData from '../data/experienceData';
import '../styles/Experience.css';

const Experience = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="experience-section container-fluid py-5">

      {/* Ensure content sits on top of the background */}
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <h2 className="text-center display-4 mb-5 section-title">
          <span className="title-decoration">{'-'}</span> Experience <span className="title-decoration">{'-'}</span>
        </h2>

        <div className="timeline">
          {experienceData.map(job => {
            const isExpanded = expandedId === job.id;

            return (
              <div
                key={job.id}
                className={`timeline-item ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleExpand(job.id)}
              >
                {/* The glowing dot */}
                <div className={`timeline-marker ${isExpanded ? 'active-marker' : ''}`}></div>

                {/* The Content Card */}
                <div className="timeline-content retro-card">
                  <div className="card-header-custom">
                    <div className="header-top">
                      <h3 className="job-title">{job.title}</h3>
                      <i className={`fas fa-chevron-down toggle-icon ${isExpanded ? 'rotate' : ''}`}></i>
                    </div>
                    <div className="job-meta">
                      <span className="company-name">@ {job.company}</span>
                      <span className="job-duration">{job.duration}</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <ul className="job-description">
                      {job.description.map((point, index) => (
                        <li key={index} className="fade-in-text">
                          <i className="fas fa-angle-right me-2 accent-icon"></i>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;