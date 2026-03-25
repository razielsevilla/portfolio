// src/components/pages/PageChapter1.js
// Chapter I — "The Story So Far" (Experience)
// pageIndex 0 (Spread 1): Left = Chapter Title, Right = Jobs 0, 1 (SEC, CFO)
// pageIndex 1 (Spread 2): Left = Jobs 2, 3 (VCRO, 1st Year Rep), Right = Job 4 (Intern)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import experienceData from '../../data/experienceData';

const ExperienceEntry = ({ job }) => {
  return (
    <div
      className="manuscript-entry"
      style={{ paddingBottom: 14, marginBottom: 14 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div className="manuscript-date">{job.duration}</div>
          <div className="manuscript-role">{job.title}</div>
          <div className="manuscript-org">{job.company}</div>
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <div style={{ width: '100%', height: 1, background: 'linear-gradient(to right, var(--accent-rust), transparent)', marginBottom: 8, opacity: 0.4 }} />
        <ul className="manuscript-bullets">
          {job.description.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PageChapter1 = ({ side, pageIndex = 0 }) => {
  if (side === 'left') {
    if (pageIndex === 0) {
      // Title page (Spread 1 Left)
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: 8, position: 'relative' }}>
          <div className="chapter-giant-num" aria-hidden="true">I</div>
          <p className="chapter-label">Chapter I</p>
          <div className="chapter-ornament" aria-hidden="true">✦</div>
          <h2 className="chapter-title">
            The Story<br /><span className="chapter-title-italic">So Far</span>
          </h2>
          <div className="chapter-divider"><span className="chapter-divider-symbol">§</span></div>
          <p className="chapter-subtitle">
            A record of roles held,<br />contributions made,<br />and lessons earned.
          </p>
          <div style={{ marginTop: 'auto', padding: '10px 0', borderTop: '1px solid var(--border-ink)', width: '100%', textAlign: 'left' }}>
            <p className="code-comment">// tap entry to expand details ↓</p>
          </div>
        </div>
      );
    }

    // Spread 2 Left: jobs 2, 3 (VCRO, 1st Yr Rep)
    const batch = experienceData.slice(2, 4);
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
         {batch.map(job => <ExperienceEntry key={job.id} job={job} />)}
      </div>
    );
  }

  // Right pages
  if (pageIndex === 0) {
    // Spread 1 Right: jobs 0, 1 (SEC, CFO)
    const batch = experienceData.slice(0, 2);
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
         {batch.map(job => <ExperienceEntry key={job.id} job={job} />)}
      </div>
    );
  }

  // Spread 2 Right: job 4 (Intern)
  const batch = experienceData.slice(4, 5);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
       {batch.map(job => <ExperienceEntry key={job.id} job={job} />)}
    </div>
  );
};

export default PageChapter1;
