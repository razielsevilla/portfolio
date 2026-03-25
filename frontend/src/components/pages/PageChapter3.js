// src/components/pages/PageChapter3.js — v2
// Projects with animated expand (ink bleed) + ghost chapter num

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectData from '../../data/projectData';

const STATUS_LABELS = {
  'live':        'Published',
  'in-progress': 'In Press',
  'case-study':  'Case Study',
  'archived':    'Archived',
};

const PageChapter3 = ({ side }) => {
  const [expanded, setExpanded] = useState(null);

  if (side === 'left') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: 8, position: 'relative' }}>
        <div className="chapter-giant-num" aria-hidden="true">III</div>
        <p className="chapter-label">Chapter III</p>
        <div className="chapter-ornament" aria-hidden="true">✦</div>
        <h2 className="chapter-title">
          Works<br /><span className="chapter-title-italic">Published</span>
        </h2>
        <div className="chapter-title-underline" />
        <div className="chapter-divider"><span className="chapter-divider-symbol">📖</span></div>
        <p className="chapter-subtitle">
          Each project is an argument<br />about how a problem<br />should be solved.
        </p>
        <div style={{ marginTop: 'auto', padding: '10px 0', borderTop: '1px solid var(--border-ink)', width: '100%', textAlign: 'left' }}>
          <p className="code-comment">// ★ = featured volume</p>
          <p className="code-comment">// tap any entry to read the synopsis</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
      {projectData.map((project) => {
        const isOpen = expanded === project.id;
        return (
          <div
            key={project.id}
            className="volume-entry"
            onClick={() => setExpanded(isOpen ? null : project.id)}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            onKeyDown={e => e.key === 'Enter' && setExpanded(isOpen ? null : project.id)}
          >
            <div className="volume-header">
              <span className="volume-title">
                {project.highlight && <span style={{ color: 'var(--accent-gold)', marginRight: 4 }}>★</span>}
                {project.title}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="volume-status">{STATUS_LABELS[project.status] || 'Archived'}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-rust)' }}
                  aria-hidden="true"
                >›</motion.span>
              </div>
            </div>
            <div className="volume-tagline">{project.tagline}</div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="synopsis"
                  initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.4 }}
                  animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
                  exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden', marginTop: 6 }}
                >
                  <div style={{ height: 1, background: 'linear-gradient(to right, var(--accent-rust), transparent)', marginBottom: 8, opacity: 0.35 }} />
                  <p className="volume-desc">{project.description}</p>
                  <div className="volume-tech" style={{ marginTop: 6 }}>
                    {project.tech.map(t => <span key={t} className="code-tag">{t}</span>)}
                  </div>
                  {(project.repoLink || project.liveLink) && (
                    <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                      {project.repoLink && (
                        <a href={project.repoLink} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-rust)', textDecoration: 'none' }}>
                          → Repository
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--ink-code)', textDecoration: 'none' }}>
                          → Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default PageChapter3;
