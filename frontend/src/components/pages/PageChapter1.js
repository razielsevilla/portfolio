import React from 'react';
import experienceData from '../../data/experienceData';
import ExperienceEntry from './ExperienceEntry';

/**
 * PageChapter1 component — Chapter I: "The Story So Far" (Professional Experience).
 * Displays a record of professional roles in a manuscript layout.
 *
 * @param {Object} props - Component props.
 * @param {string} props.side - The side of the spread being rendered ('left' | 'right').
 * @param {number} props.pageIndex - The relative index of the page within the chapter.
 */
const PageChapter1 = ({ side, pageIndex = 0 }) => {
  /**
   * Handle Left Page rendering.
   */
  if (side === 'left') {
    if (pageIndex === 0) {
      {/* Title page (Spread 1 Left) */}
      return (
        <div className="chapter-title-container">
          <div className="chapter-giant-num" aria-hidden="true">
            I
          </div>
          <p className="chapter-label">Chapter I</p>
          <div className="chapter-ornament" aria-hidden="true">
            ✦
          </div>
          <h2 className="chapter-title">
            The Story
            <br />
            <span className="chapter-title-italic">So Far</span>
          </h2>
          <div className="chapter-divider">
            <span className="chapter-divider-symbol">§</span>
          </div>
          <p className="chapter-subtitle">
            A record of roles held,
            <br />
            contributions made,
            <br />
            and lessons earned.
          </p>
          <div className="page-footer">
            <p className="code-comment">// tap entry to expand details ↓</p>
          </div>
        </div>
      );
    }

    {/* Spread 2 Left: jobs 2, 3 (VCRO, 1st Yr Rep) */}
    const batch = experienceData.slice(2, 4);
    return (
      <div className="page-flex-col">
        <div className="experience-timeline">
          {batch.map((job, idx) => (
            <ExperienceEntry key={job.id} job={job} index={idx + 3} />
          ))}
        </div>
      </div>
    );
  }

  /**
   * Handle Right Page rendering.
   */
  if (pageIndex === 0) {
    // Spread 1 Right: jobs 0, 1 (SEC, CFO)
    const batch = experienceData.slice(0, 2);
    return (
      <div className="page-flex-col">
        <div className="experience-timeline">
          {batch.map((job, idx) => (
            <ExperienceEntry key={job.id} job={job} index={idx + 1} />
          ))}
        </div>
      </div>
    );
  }

  // Spread 2 Right: job 4 (Intern)
  const batch = experienceData.slice(4, 5);
  return (
    <div className="page-flex-col">
      <div className="experience-timeline">
        {batch.map((job, idx) => (
          <ExperienceEntry key={job.id} job={job} index={idx + 5} />
        ))}
      </div>
    </div>
  );
};

export default PageChapter1;
