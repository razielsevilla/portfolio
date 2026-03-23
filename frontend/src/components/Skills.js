// src/components/Skills.js

import React, { useEffect, useRef, useState } from 'react';
import skillsData from '../data/skillsData';
import '../styles/Skills.css';

// Tier config: label and CSS modifier class
const TIER_CONFIG = {
  core:     { label: 'CORE STACK',   cls: 'tier-core' },
  extended: { label: 'EXTENDED',     cls: 'tier-extended' },
  research: { label: 'RESEARCH',     cls: 'tier-research' },
};

// Individual skill row with an animated proficiency bar
const SkillBar = ({ name, proficiency }) => {
  const barRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-row" ref={barRef}>
      <div className="skill-row-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{proficiency}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: animated ? `${proficiency}%` : '0%' }}
          aria-valuenow={proficiency}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">

        <h2 className="section-title text-center">
          <span className="title-decoration">{'//'}</span>
          Technical Stack
          <span className="title-decoration">{'//'}</span>
        </h2>
        <p className="section-subtitle text-center">
          Organized by role, not just type — because the tool only matters in context.
        </p>

        <div className="skills-grid">
          {skillsData.map((group) => {
            const tier = TIER_CONFIG[group.tier] || TIER_CONFIG.extended;
            return (
              <div key={group.category} className={`skill-panel ${tier.cls}`}>

                {/* Panel Header */}
                <div className="panel-header">
                  <div className="panel-header-left">
                    <i className={`${group.icon} panel-icon`} aria-hidden="true" />
                    <div>
                      <h3 className="panel-title">{group.category}</h3>
                      <p className="panel-subtitle">{group.subtitle}</p>
                    </div>
                  </div>
                  <span className="tier-badge">{tier.label}</span>
                </div>

                {/* Skill Bars */}
                <div className="panel-body">
                  {group.items.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      proficiency={skill.proficiency}
                    />
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;