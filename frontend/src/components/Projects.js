// src/components/Projects.js

import React, { useState } from 'react';
import projectData from '../data/projectData';
import '../styles/Projects.css';

// Status config: badge label, CSS class, CTA logic
const STATUS_CONFIG = {
  'live':        { label: 'LIVE',        cls: 'status-live',        showRepo: true,  showLive: true  },
  'in-progress': { label: 'IN PROGRESS', cls: 'status-in-progress', showRepo: false, showLive: false },
  'case-study':  { label: 'CASE STUDY',  cls: 'status-case-study',  showRepo: true,  showLive: false },
  'archived':    { label: 'ARCHIVED',    cls: 'status-archived',    showRepo: true,  showLive: false },
};

const ProjectCard = ({ project }) => {
  const cfg = STATUS_CONFIG[project.status] || STATUS_CONFIG['archived'];
  const isInProgress = project.status === 'in-progress';

  return (
    <div className={`project-card ${project.highlight ? 'card-featured' : ''} ${isInProgress ? 'card-wip' : ''}`}>

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

    </div>
  );
};

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

  // Featured cards always show; non-featured hidden behind "Show all" toggle
  const featured   = filteredProjects.filter(p => p.highlight);
  const secondary  = filteredProjects.filter(p => !p.highlight);
  const visibleSecondary = showAll ? secondary : secondary.slice(0, 3);

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

        {/* Secondary grid */}
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