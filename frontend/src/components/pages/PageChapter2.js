// src/components/pages/PageChapter2.js
// Spread 3 — "Tools of the Trade" (Skills)
// Left: chapter title page
// Right: skill inventory with illustrated category headers + code-style labels

import React from 'react';
import skillsData from '../../data/skillsData';

// Tier badge styling
const TIER_STYLES = {
  core:     { label: '[ core ]',     color: 'var(--accent-rust)' },
  extended: { label: '[ extended ]', color: 'var(--ink-code)' },
  research: { label: '[ research ]', color: 'var(--ink-muted)' },
};

const PageChapter2 = ({ side }) => {
  if (side === 'left') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: 10 }}>
        <p className="chapter-label">Chapter II</p>
        <div className="chapter-ornament" aria-hidden="true">✦</div>

        <h2 className="chapter-title">
          Tools of<br />
          <span className="chapter-title-italic">the Trade</span>
        </h2>

        <div className="chapter-divider">
          <span className="chapter-divider-symbol">⚙</span>
        </div>

        <p className="chapter-subtitle">
          Not what I know,<br />
          but what I know<br />
          <em>it is for</em>.
        </p>

        {/* Proficiency legend */}
        <div style={{ marginTop: 'auto', width: '100%', padding: '12px 0', borderTop: '1px solid var(--border-ink)' }}>
          <p className="code-comment" style={{ textAlign: 'left' }}>// proficiency bars: 0–100</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <div style={{ flex: 1, height: 3, background: 'linear-gradient(to right, var(--accent-rust), var(--accent-gold))' }} />
            <span className="code-comment">100%</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 10 }}>
            {Object.values(TIER_STYLES).map(t => (
              <span key={t.label} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: t.color }}>
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Right — skill inventory
  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, paddingRight: 4 }}>
      {skillsData.map((category) => {
        const tierStyle = TIER_STYLES[category.tier] || TIER_STYLES.research;
        return (
          <div key={category.category} className="skill-category">
            <div className="skill-category-label">
              <span style={{ color: tierStyle.color, fontFamily: 'var(--font-mono)' }}>{tierStyle.label}</span>
              &nbsp;{category.category}
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: 8 }}>
              {category.subtitle}
            </p>
            {category.items.map((skill) => (
              <div key={skill.name} className="skill-item">
                <span className="skill-name">{skill.name}</span>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.proficiency}%` }}
                    role="progressbar"
                    aria-valuenow={skill.proficiency}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <span className="skill-pct">{skill.proficiency}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PageChapter2;
