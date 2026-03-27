import React from 'react';
import { STATUS_LABELS } from '../../constants';

/**
 * ProjectEntry component — Renders a single project entry in the "Works Published" style.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.project - Project data object.
 */
const ProjectEntry = ({ project }) => {
  return (
    <div className="volume-entry volume-entry--hover volume-entry-container">
      <div className="volume-header">
        <span className="volume-title">
          {project.highlight && <span className="volume-star">★</span>}
          {project.title}
        </span>
        <div className="volume-header-flex">
          <span className="volume-status" data-status={project.status}>
            {STATUS_LABELS[project.status] || STATUS_LABELS.archived}
          </span>
        </div>
      </div>
      <div className="volume-tagline">{project.tagline}</div>

      <div className="vellum-overlay vellum-overlay-container">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="volume-preview-img"
          />
        ) : (
          <div className="volume-preview-placeholder">{"// Image Preview Placeholder"}</div>
        )}
        <div className="volume-links">
          {project.repoLink && (
            <button
              className="volume-link-btn volume-link-repo"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.repoLink, '_blank', 'noopener,noreferrer');
              }}
            >
              <i className="fab fa-github" style={{ marginRight: 6 }}></i> View Repo
            </button>
          )}
          {project.liveLink && (
            <button
              className="volume-link-btn volume-link-live"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveLink, '_blank', 'noopener,noreferrer');
              }}
            >
              <i className="fas fa-external-link-alt" style={{ marginRight: 6 }}></i> Live Demo
            </button>
          )}
        </div>
      </div>

      <div className="volume-desc-container">
        <div className="manuscript-entry-divider" aria-hidden="true" />
        <p className="volume-desc">{project.description}</p>
        <div className="volume-tech volume-tech-list">
          {project.tech.map((t) => (
            <span key={t} className="code-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectEntry;
