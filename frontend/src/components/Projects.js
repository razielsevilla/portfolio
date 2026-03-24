// src/components/Projects.js

import React, { useState, useRef, useCallback } from 'react';
import projectData from '../data/projectData';
import '../styles/Projects.css';

// Status config: badge label, CSS modifier class, CTA visibility
const STATUS_CONFIG = {
  'live':        { label: 'LIVE',        cls: 'status-live',        showRepo: true,  showLive: true  },
  'in-progress': { label: 'IN PROGRESS', cls: 'status-in-progress', showRepo: false, showLive: false },
  'case-study':  { label: 'CASE STUDY',  cls: 'status-case-study',  showRepo: true,  showLive: false },
  'archived':    { label: 'ARCHIVED',    cls: 'status-archived',    showRepo: true,  showLive: false },
};

/* ============================================================
   Delight #2 — 3D Tilt Card
   Pure CSS perspective + JS mouse tracking.
   No library. ~20 lines of logic.
   ============================================================ */
const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const rafRef  = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);   // -1 → 1
      const dy     = (e.clientY - cy) / (rect.height / 2);   // -1 → 1

      // Max tilt: 8deg. Light, not nauseating.
      const rotX = (-dy * 8).toFixed(2);
      const rotY = (dx  * 8).toFixed(2);

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
      card.style.transition = 'transform 0.05s linear';
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    card.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

/* ============================================================
   Project Card
   ============================================================ */
const ProjectCard = ({ project }) => {
  const cfg = STATUS_CONFIG[project.status] || STATUS_CONFIG['archived'];
  const isInProgress = project.status === 'in-progress';

  return (
    <TiltCard className={`project-card ${project.highlight ? 'card-featured' : ''} ${isInProgress ? 'card-wip' : ''}`}>
      {/* Header row */}
      <div className="card-top">
        <i className="fas fa-folder-open card-folder-icon" aria-hidden="true" />
        <span className={`status-badge ${cfg.cls}`}>{cfg.label}</span>
      </div>

      {/* Title + tagline */}
      <h3 className="card-title">{project.title}</h3>
      <p className="card-tagline">{project.tagline}</p>

      {/* Description */}
      <p className="card-desc">{project.description}</p>

      {/* Tech stack */}
      <div className="tech-stack">
        {project.tech.map(t => (
          <span key={t} className="tech-pill">{t}</span>
        ))}
      </div>

      {/* Footer CTA — context-aware */}
      <div className="card-footer-cta">
        {cfg.showRepo && project.repoLink && (
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="cta-link">
            <i className="fab fa-github" aria-hidden="true" /> Code
          </a>
        )}
        {cfg.showLive && project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="cta-link cta-live">
            <i className="fas fa-external-link-alt" aria-hidden="true" /> Demo
          </a>
        )}
        {isInProgress && (
          <span className="cta-wip">
            <i className="fas fa-lock" aria-hidden="true" /> Repo private — launching soon
          </span>
        )}
      </div>
    </TiltCard>
  );
};

/* ============================================================
   Projects Section
   ============================================================ */
const Projects = () => {
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const allTechStack = ['All', ...new Set(projectData.flatMap(p => p.tech))].sort();

  const handleFilterClick = (tech) => {
    if (tech === 'All') {
      setSelectedTechs([]);
    } else {
      setSelectedTechs(prev =>
        prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
      );
    }
  };

  const filteredProjects = selectedTechs.length === 0
    ? projectData
    : projectData.filter(p => p.tech.some(t => selectedTechs.includes(t)));

  const featured          = filteredProjects.filter(p => p.highlight);
  const secondary         = filteredProjects.filter(p => !p.highlight);
  const visibleSecondary  = showAll ? secondary : secondary.slice(0, 3);

  return (
    <section id="projects" className="projects-section">
      <div className="project-bg-grid" aria-hidden="true" />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <h2 className="section-title text-center">
          <span className="title-decoration">{'//'}</span>
          Project Archive
          <span className="title-decoration">{'//'}</span>
        </h2>

        {/* Filter bar */}
        <div className="filter-scroll-container mb-5">
          <div className="filter-track">
            {allTechStack.map(tech => {
              const isActive = tech === 'All'
                ? selectedTechs.length === 0
                : selectedTechs.includes(tech);
              return (
                <button
                  key={tech}
                  className={`btn filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleFilterClick(tech)}
                >
                  <span className="status-dot" aria-hidden="true" /> {tech}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured row */}
        {featured.length > 0 && (
          <div className="featured-grid mb-4">
            {featured.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}

        {/* Standard grid */}
        {secondary.length > 0 && (
          <>
            <div className="projects-grid">
              {visibleSecondary.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>

            {secondary.length > 3 && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-show-more"
                  onClick={() => setShowAll(v => !v)}
                >
                  {showAll
                    ? <><i className="fas fa-chevron-up me-2" />Show Less</>
                    : <><i className="fas fa-chevron-down me-2" />Show {secondary.length - 3} More Projects</>
                  }
                </button>
              </div>
            )}
          </>
        )}

        {filteredProjects.length === 0 && (
          <p className="text-center text-muted mt-5">No projects match these filters.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;