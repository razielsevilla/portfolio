import React from 'react';
import { TIER_CONFIG } from '../../constants';

/**
 * Helper to calculate experience based on a start date string (YYYY-MM).
 */
const calculateExperience = (startDateStr) => {
  if (!startDateStr) return 'Operational';
  
  const start = new Date(startDateStr);
  const now = new Date();
  
  // Total months difference
  const diffInMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  
  if (diffInMonths < 1) return 'New';
  if (diffInMonths < 12) return `${diffInMonths} MOS`;
  
  const years = (diffInMonths / 12).toFixed(1);
  return `${years.replace(/\.0$/, '')} YOE`;
};

/**
 * PillarCategory component — Renders a group of skills under a specific tier.
 */
const PillarCategory = ({ category }) => {
  const cfg = TIER_CONFIG[category.tier] || TIER_CONFIG.research;

  return (
    <div className={`pillar-category tier-${category.tier}`}>
      <div className="pillar-tier-label" style={{ color: cfg.color }}>
        <span className="pillar-tier-badge">{cfg.label}</span>
        <span className="pillar-tier-name">{category.category}</span>
      </div>
      <p className="pillar-tier-subtitle">{category.subtitle}</p>
      
      {/* Unified Scientific Index Layout */}
      <div className="scientific-index">
        {category.items.map((skill, idx) => (
          <div key={skill.name} className="index-row">
            <span className="index-id">
              {category.tier === 'core' ? 'CORE' : category.tier === 'research' ? 'FRON' : 'EXTD'}_
              {(idx + 1).toString().padStart(2, '0')}
            </span>
            <span className="index-name">{skill.name}</span>
            <span className="index-status" style={{ color: cfg.color }}>
              {calculateExperience(skill.startDate)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PillarCategory;
