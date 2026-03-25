import React from 'react';
import projectData from '../../data/projectData';
import ProjectEntry from './ProjectEntry';

/**
 * PageChapter3 component — Chapter III: "Works Published" (Projects).
 * Displays a curated list of engineering projects and case studies.
 *
 * @param {Object} props - Component props.
 * @param {string} props.side - The side of the spread being rendered ('left' | 'right').
 * @param {number} props.pageIndex - The relative index of the page within the chapter.
 */
const PageChapter3 = ({ side, pageIndex = 0 }) => {
  /**
   * Handle Left Page rendering.
   */
  if (side === 'left') {
    if (pageIndex === 0) {
      // Spread 5 Left: Title Page
      return (
        <div className="chapter-title-container">
          <div className="chapter-giant-num" aria-hidden="true">
            III
          </div>
          <p className="chapter-label">Chapter III</p>
          <div className="chapter-ornament" aria-hidden="true">
            ✦
          </div>
          <h2 className="chapter-title">
            Works
            <br />
            <span className="chapter-title-italic">Published</span>
          </h2>
          <div className="chapter-divider">
            <span className="chapter-divider-symbol">📖</span>
          </div>
          <p className="chapter-subtitle">
            Each project is an argument
            <br />
            about how a problem
            <br />
            should be solved.
          </p>

          <div className="page-footer">
            <p className="code-comment">// hover entry → code preview</p>
            <p className="code-comment">// click entry → read synopsis</p>
          </div>
        </div>
      );
    }

    if (pageIndex === 1) {
      // Spread 6 Left: Projects 3, 4
      const batch = projectData.slice(2, 4);
      return (
        <div className="page-flex-col">
          {batch.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      );
    }

    if (pageIndex === 2) {
      // Spread 7 Left: Projects 7, 8
      const batch = projectData.slice(6, 8);
      return (
        <div className="page-flex-col">
          {batch.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      );
    }
  }

  /**
   * Handle Right Page rendering.
   */
  if (pageIndex === 0) {
    // Spread 5 Right: Projects 1, 2
    const batch = projectData.slice(0, 2);
    return (
      <div className="page-flex-col">
        {batch.map((project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </div>
    );
  }

  if (pageIndex === 1) {
    // Spread 6 Right: Projects 5, 6
    const batch = projectData.slice(4, 6);
    return (
      <div className="page-flex-col">
        {batch.map((project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </div>
    );
  }

  if (pageIndex === 2) {
    // Spread 7 Right: Projects 9, 10
    const batch = projectData.slice(8, 10);
    return (
      <div className="page-flex-col">
        {batch.map((project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </div>
    );
  }

  return null;
};

export default PageChapter3;
