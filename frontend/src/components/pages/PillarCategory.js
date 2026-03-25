import React from 'react';
import { TIER_CONFIG } from '../../constants';

/**
 * PillarCategory component — Renders a group of skills under a specific tier.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.category - Skill category data containing tier, title, subtitle, and items.
 */
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
        {category.items.map((skill) => (
          <span
            key={skill.name}
            className="pillar-tag pillar-tag-new"
            style={{ borderLeftColor: cfg.color }}
          >
            {skill.name}
            {skill.yoe && <span className="pillar-yoe">{skill.yoe}</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PillarCategory;
