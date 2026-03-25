// src/components/pages/PageChapter2.js
// Chapter II — "Tools of the Trade" (Skills)
// pageIndex 0 (Spread 3): Left = Chapter Title, Right = Core Skills
// pageIndex 1 (Spread 4): Left = Extended Skills, Right = Frontier Skills

import React from 'react';
import skillsData from '../../data/skillsData';

// Tier configuration — no percentages, just tier identity
const TIER_CONFIG = {
  core:     { label: '[ CORE ]',     color: 'var(--accent-rust)',  bg: 'rgba(139,69,19,0.08)' },
  extended: { label: '[ EXTENDED ]', color: 'var(--ink-code)',     bg: 'rgba(124,252,138,0.06)' },
  research: { label: '[ FRONTIER ]', color: 'var(--ink-muted)',    bg: 'rgba(138,125,110,0.08)' },
};

const PillarCategory = ({ category }) => {
  const cfg = TIER_CONFIG[category.tier] || TIER_CONFIG.research;
  return (
    <div className="pillar-category">
      <div className="pillar-tier-label" style={{ color: cfg.color }}>
        <span className="pillar-tier-badge">{cfg.label}</span>
        <span className="pillar-tier-name">{category.category}</span>
      </div>
      <p className="pillar-tier-subtitle">{category.subtitle}</p>
      <div className="pillar-grid">
        {category.items.map(skill => (
          <span
            key={skill.name}
            className="pillar-tag"
            style={{ borderLeftColor: cfg.color, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            {skill.name}
            {skill.yoe && (
              <span style={{ fontSize: '0.52rem', opacity: 0.6 }}>{skill.yoe}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

const PageChapter2 = ({ side, pageIndex = 0 }) => {
  if (side === 'left') {
    if (pageIndex === 0) {
      // Title page (Spread 3 Left, Page 7)
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

          <div style={{ marginTop: 'auto', width: '100%', padding: '12px 0', borderTop: '1px solid var(--border-ink)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p className="code-comment">// skill tier legend:</p>
            {Object.entries(TIER_CONFIG).map(([key, cfg]) => (
              <span key={key} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: cfg.color, textAlign: 'left' }}>
                {cfg.label} — {key === 'core' ? 'daily driver' : key === 'extended' ? 'frequently applied' : 'active exploration'}
              </span>
            ))}
          </div>
        </div>
      );
    }

    // Spread 4 Left (Page 9): Extended Skills
    const extCat = skillsData.filter(c => c.tier === 'extended');
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {extCat.map(category => (
          <PillarCategory key={category.category} category={category} />
        ))}
      </div>
    );
  }

  // Right pages
  if (pageIndex === 0) {
    // Spread 3 Right (Page 8): Core Skills
    const coreCat = skillsData.filter(c => c.tier === 'core');
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {coreCat.map(category => (
          <PillarCategory key={category.category} category={category} />
        ))}
      </div>
    );
  }

  // Spread 4 Right (Page 10): Frontier Skills
  const rsCat = skillsData.filter(c => c.tier === 'research');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {rsCat.map(category => (
        <PillarCategory key={category.category} category={category} />
      ))}
    </div>
  );
};

export default PageChapter2;
