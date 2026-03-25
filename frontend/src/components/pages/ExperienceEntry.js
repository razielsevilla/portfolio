import React from 'react';

/**
 * ExperienceEntry component — Renders a single job entry in the manuscript style.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.job - Job data object containing title, company, duration, and description.
 * @param {number} props.index - The numerical index of the entry for Roman numerals.
 */
const ExperienceEntry = ({ job, index }) => {
  // Simple Roman numeral converter for indices 1-10
  const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
  const romanIndex = romanNumerals[index - 1] || index;

  return (
    <div className="manuscript-entry manuscript-entry-container">
      {/* Roman Indexing */}
      <div className="manuscript-index" aria-hidden="true">
        {romanIndex}.
      </div>

      {/* Marginalia */}
      {job.annotation && (
        <div className="manuscript-marginalia" aria-hidden="true">
          {job.annotation}
        </div>
      )}

      <div className="manuscript-entry-header">
        <div>
          <div className="manuscript-date">{job.duration}</div>
          <div className="manuscript-role">{job.title}</div>
          <div className="manuscript-org">{job.company}</div>
        </div>
      </div>

      <div className="manuscript-entry-body">
        <div className="manuscript-entry-divider" aria-hidden="true" />
        <ul className="manuscript-bullets">
          {job.description.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceEntry;
