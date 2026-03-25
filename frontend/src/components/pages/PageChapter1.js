// src/components/pages/PageChapter1.js — v2
// Experience with animated expand (ink-bleed reveal) + ghost chapter num

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import experienceData from '../../data/experienceData';

const PageChapter1 = ({ side }) => {
  const [expanded, setExpanded] = useState(null);

  if (side === 'left') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: 8, position: 'relative' }}>
        <div className="chapter-giant-num" aria-hidden="true">I</div>
        <p className="chapter-label">Chapter I</p>
        <div className="chapter-ornament" aria-hidden="true">✦</div>
        <h2 className="chapter-title">
          The Story<br /><span className="chapter-title-italic">So Far</span>
        </h2>
        <div className="chapter-title-underline" />
        <div className="chapter-divider"><span className="chapter-divider-symbol">§</span></div>
        <p className="chapter-subtitle">
          A record of roles held,<br />contributions made,<br />and lessons earned.
        </p>
        <div style={{ marginTop: 'auto', padding: '10px 0', borderTop: '1px solid var(--border-ink)', width: '100%', textAlign: 'left' }}>
          <p className="code-comment">// Each entry is an argument about</p>
          <p className="code-comment">// how I think — not just what I did.</p>
          <p className="code-comment" style={{ marginTop: 4 }}>// tap entry to expand ↓</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
      {experienceData.map((job) => {
        const isOpen = expanded === job.id;
        return (
          <div
            key={job.id}
            className="manuscript-entry"
            style={{ cursor: 'pointer', paddingBottom: 14, marginBottom: 14 }}
            onClick={() => setExpanded(isOpen ? null : job.id)}
            role="button"
            aria-expanded={isOpen}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setExpanded(isOpen ? null : job.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <div className="manuscript-date">{job.duration}</div>
                <div className="manuscript-role">{job.title}</div>
                <div className="manuscript-org">{job.company}</div>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-rust)', marginLeft: 8, flexShrink: 0 }}
                aria-hidden="true"
              >
                ›
              </motion.span>
            </div>

            {/* Animated ink-bleed reveal */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="details"
                  initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.4 }}
                  animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
                  exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden', marginTop: 10 }}
                >
                  {/* Ink accent bar */}
                  <div style={{ width: '100%', height: 1, background: 'linear-gradient(to right, var(--accent-rust), transparent)', marginBottom: 8, opacity: 0.4 }} />
                  <ul className="manuscript-bullets">
                    {job.description.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.3 }}
                      >
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default PageChapter1;
