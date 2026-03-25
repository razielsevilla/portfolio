// src/components/book/TableOfContents.js
// Slide-in panel from the right — styled like a book's contents page.
// Uses framer-motion for the slide animation.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHAPTERS = [
  { num: '00',  title: 'Foreword',           sub: 'A Note from the Author',       page: 1  },
  { num: 'I',   title: 'The Story So Far',   sub: 'Experience & Milestones',      page: 3  },
  { num: 'II',  title: 'Tools of the Trade', sub: 'Skills & Arsenal',             page: 5  },
  { num: 'III', title: 'Works Published',    sub: 'Projects & Prototypes',        page: 7  },
  { num: 'IV',  title: 'The Codex',          sub: 'Philosophy & Beliefs',         page: 9  },
  { num: '∞',   title: 'The Next Chapter',   sub: 'An Open Invitation',           page: 11 },
];

const TableOfContents = ({ isOpen, onClose, currentSpread, onNavigate }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          className="toc-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Panel */}
        <motion.div
          className="toc-panel paper-texture"
          role="dialog"
          aria-modal="true"
          aria-label="Table of Contents"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        >
          <h2 className="toc-title">Table of Contents</h2>
          <p className="toc-subtitle">Raziel Sevilla — A Living Codex</p>

          <ul className="toc-list" role="list">
            {CHAPTERS.map((ch, idx) => (
              <li
                key={ch.num}
                className={`toc-item ${currentSpread === idx ? 'active' : ''}`}
                role="listitem"
                onClick={() => { onNavigate(idx); onClose(); }}
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter') && (onNavigate(idx), onClose())}
              >
                <span className="toc-item-num">{ch.num}</span>
                <span>
                  <div className="toc-item-title">{ch.title}</div>
                  <div className="toc-item-sub">{ch.sub}</div>
                </span>
                <span className="toc-item-pg">{ch.page}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onClose}
            style={{
              marginTop: 'auto',
              paddingTop: '24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
            }}
            aria-label="Close table of contents"
          >
            ← Close
          </button>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default TableOfContents;
