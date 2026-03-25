// src/components/pages/PageChapter3.js
// Chapter III — "Works Published" (Projects)
// SPEC:
// Spread 5 (idx 0): Left = Title, Right = Projects 1, 2
// Spread 6 (idx 1): Left = Projects 3, 4, Right = Projects 5, 6
// Spread 7 (idx 2): Left = Projects 7, 8, Right = Projects 9, 10

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectData from '../../data/projectData';

const STATUS_LABELS = {
  'live':        'Published',
  'in-progress': 'In Press',
  'case-study':  'Case Study',
  'archived':    'Archived',
};

const VolumeEntry = ({ project }) => {
  return (
    <div
      className="volume-entry volume-entry--hover"
      style={{ paddingBottom: 14, marginBottom: 14 }}
    >
      <div className="volume-header">
        <span className="volume-title">
          {project.highlight && <span style={{ color: 'var(--accent-gold)', marginRight: 4 }}>★</span>}
          {project.title}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            className="volume-status"
            data-status={project.status}
          >
            {STATUS_LABELS[project.status] || 'Archived'}
          </span>
        </div>
      </div>
      <div className="volume-tagline">{project.tagline}</div>

      <div className="vellum-overlay" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 16 }}>
        {project.image ? (
            <img src={project.image} alt={`${project.title} preview`} style={{ width: '100%', maxHeight: '120px', objectFit: 'contain', borderRadius: 4, border: '1px solid var(--border-ink)' }} />
          ) : (
            <div style={{ width: '100%', height: '100px', background: 'var(--bg-page)', border: '1px dashed var(--border-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-muted)' }}>
              // Image Preview Placeholder
            </div>
        )}
        <div style={{ display: 'flex', gap: 16 }}>
          {project.repoLink && (
            <a href={project.repoLink} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-rust)', textDecoration: 'none', background: 'var(--bg-page)', padding: '6px 12px', border: '1px solid var(--accent-rust)', borderRadius: 2 }}>
              <i className="fab fa-github" style={{ marginRight: 6 }}></i> View Repo
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-code)', textDecoration: 'none', background: 'var(--bg-page)', padding: '6px 12px', border: '1px solid var(--ink-code)', borderRadius: 2 }}>
              <i className="fas fa-external-link-alt" style={{ marginRight: 6 }}></i> Live Demo
            </a>
          )}
        </div>
      </div>

      <div style={{ marginTop: 6 }}>
        <div style={{ height: 1, background: 'linear-gradient(to right, var(--accent-rust), transparent)', marginBottom: 8, opacity: 0.35 }} />
        <p className="volume-desc">{project.description}</p>
        <div className="volume-tech" style={{ marginTop: 6 }}>
          {project.tech.map(t => <span key={t} className="code-tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
};

const PageChapter3 = ({ side, pageIndex = 0 }) => {
  if (side === 'left') {
    if (pageIndex === 0) {
      // Spread 5 Left (Page 11): Title Only
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: 10 }}>
          <div className="chapter-giant-num" aria-hidden="true">III</div>
          <p className="chapter-label">Chapter III</p>
          <div className="chapter-ornament" aria-hidden="true">✦</div>
          <h2 className="chapter-title">
            Works<br /><span className="chapter-title-italic">Published</span>
          </h2>
          <div className="chapter-divider"><span className="chapter-divider-symbol">📖</span></div>
          <p className="chapter-subtitle">
            Each project is an argument<br />about how a problem<br />should be solved.
          </p>

          <div style={{ marginTop: 'auto', padding: '10px 0', borderTop: '1px solid var(--border-ink)', width: '100%', textAlign: 'left' }}>
            <p className="code-comment">// hover entry → code preview</p>
            <p className="code-comment">// click entry → read synopsis</p>
          </div>
        </div>
      );
    }

    if (pageIndex === 1) {
      // Spread 6 Left (Page 13): Projects 3, 4 (Toka, RedQuest)
      const batch = projectData.slice(2, 4);
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {batch.map(project => <VolumeEntry key={project.id} project={project} />)}
        </div>
      );
    }

    if (pageIndex === 2) {
      // Spread 7 Left (Page 15): Projects 7, 8
      const batch = projectData.slice(6, 8);
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {batch.map(project => <VolumeEntry key={project.id} project={project} />)}
        </div>
      );
    }
  }

  // Right pages
  if (pageIndex === 0) {
    // Spread 5 Right (Page 12): Projects 1, 2 (Kumpirma, SonicPath)
    const batch = projectData.slice(0, 2);
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {batch.map(project => <VolumeEntry key={project.id} project={project} />)}
      </div>
    );
  }

  if (pageIndex === 1) {
    // Spread 6 Right (Page 14): Projects 5, 6 (Prioritask, LifeInPixels)
    const batch = projectData.slice(4, 6);
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {batch.map(project => <VolumeEntry key={project.id} project={project} />)}
      </div>
    );
  }

  if (pageIndex === 2) {
    // Spread 7 Right (Page 16): Projects 9, 10
    const batch = projectData.slice(8, 10);
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {batch.map(project => <VolumeEntry key={project.id} project={project} />)}
      </div>
    );
  }

  return null;
};

export default PageChapter3;
