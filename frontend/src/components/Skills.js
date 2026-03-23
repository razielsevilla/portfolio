// src/components/Skills.js

import React from 'react';
import skillsData from '../data/skillsData';
import '../styles/Skills.css';

const Skills = () => {
    return (
        <section id="skills" className="skills-section container">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
                {skillsData.map((skillGroup, index) => (
                    <div key={index} className="skill-category-card">
                        <h3>{skillGroup.category}</h3>
                        <div className="skills-list">
                            {skillGroup.items.map((skill, i) => (
                                <span key={i} className="skill-badge">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;