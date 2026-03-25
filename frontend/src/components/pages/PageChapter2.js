import React from 'react';
import skillsData from '../../data/skillsData';
import PillarCategory from './PillarCategory';
import { TIER_CONFIG } from '../../constants';

/**
 * PageChapter2 component — Chapter II: "Tools of the Trade" (Skills and Technologies).
 * Presents technical skills categorized by proficiency tiers.
 *
 * @param {Object} props - Component props.
 * @param {string} props.side - The side of the spread being rendered ('left' | 'right').
 * @param {number} props.pageIndex - The relative index of the page within the chapter.
 */
const PageChapter2 = ({ side, pageIndex = 0 }) => {
  /**
   * Handle Left Page rendering.
   */
  if (side === 'left') {
    if (pageIndex === 0) {
      {/* Title page (Spread 3 Left) */}
      return (
        <div className="chapter-title-container-skills">
          <p className="chapter-label">Chapter II</p>
          <div className="chapter-ornament" aria-hidden="true">
            ✦
          </div>
          <h2 className="chapter-title">
            Tools of
            <br />
            <span className="chapter-title-italic">the Trade</span>
          </h2>
          <div className="chapter-divider">
            <span className="chapter-divider-symbol">⚙</span>
          </div>
          <p className="chapter-subtitle">
            Not what I know,
            <br />
            but what I know
            <br />
            <em>it is for</em>.
          </p>

          <div className="tier-legend-container">
            <p className="code-comment">// skill tier legend:</p>
            {Object.entries(TIER_CONFIG).map(([key, cfg]) => (
              <span key={key} className="tier-legend-item" style={{ color: cfg.color }}>
                {cfg.label} —{' '}
                {key === 'core'
                  ? 'daily driver'
                  : key === 'extended'
                  ? 'frequently applied'
                  : 'active exploration'}
              </span>
            ))}
          </div>
        </div>
      );
    }

    {/* Spread 4 Left (Page 9): Extended Skills */}
    const extCat = skillsData.filter((c) => c.tier === 'extended');
    return (
      <div className="pillar-category-container">
        {extCat.map((category) => (
          <PillarCategory key={category.category} category={category} />
        ))}
      </div>
    );
  }

  /**
   * Handle Right Page rendering.
   */
  if (pageIndex === 0) {
    {/* Spread 3 Right (Page 8): Core Skills */}
    const coreCat = skillsData.filter((c) => c.tier === 'core');
    return (
      <div className="pillar-category-container">
        {coreCat.map((category) => (
          <PillarCategory key={category.category} category={category} />
        ))}
      </div>
    );
  }

  {/* Spread 4 Right (Page 10): Frontier Skills */}
  const rsCat = skillsData.filter((c) => c.tier === 'research');
  return (
    <div className="pillar-category-container">
      {rsCat.map((category) => (
        <PillarCategory key={category.category} category={category} />
      ))}
    </div>
  );
};

export default PageChapter2;
