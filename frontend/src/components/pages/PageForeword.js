import React from 'react';
import heroData from '../../data/heroData';

/**
 * PageForeword component — The opening note of the Living Codex.
 * Handles both the left (title) and right (prose) sides of the foreword spread.
 *
 * @param {Object} props - Component props.
 * @param {string} props.side - The side of the spread being rendered ('left' | 'right').
 */
const PageForeword = ({ side }) => {
  /**
   * Left Page: Title and Chapter Details
   */
  if (side === 'left') {
    return (
      <div className="book-page-inner page-pt-60 page-center">
        <p className="chapter-label">Foreword</p>
        <div className="chapter-ornament" aria-hidden="true">
          ✦
        </div>

        <h2 className="chapter-title">
          A Note from
          <br />
          <span className="chapter-title-italic">the Author</span>
        </h2>

        <div className="chapter-divider">
          <span className="chapter-divider-symbol">✒</span>
        </div>

        <p className="chapter-subtitle">
          On engineering, <br />
          systems thinking, <br />
          and the craft of code.
        </p>

        {/* Footer Code Comments */}
        <div className="page-footer">
          <p className="code-comment">// This portfolio is a living document.</p>
          <p className="code-comment">// It treats projects as published works</p>
          <p className="code-comment">// and commits as draft revisions.</p>
        </div>
      </div>
    );
  }

  /**
   * Right Page: Main Content and CTA
   */
  return (
    <div className="book-page-inner page-pt-25">
      <div className="prose">
        {/* Using Drop Cap for the first paragraph */}
        <p className="drop-cap">{heroData.descriptionOne}</p>
        <p>{heroData.descriptionTwo}</p>
        <p>{heroData.descriptionThree}</p>
      </div>

      {/* Signature & CTA Section */}
      <div className="signature-section">
        <p className="foreword-name-display">{heroData.name}</p>
        <p className="code-comment" style={{ marginTop: '1px', marginBottom: '12px' }}>
          // Full-Stack Developer
        </p>

        {/* Prominent Access CV Button */}
        <div className="seal-container">
          <a
            href={heroData.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="seal-btn"
          >
            <i className="fas fa-file-pdf" aria-hidden="true" />
            Access CV
          </a>
          <p className="code-comment" style={{ marginTop: 6, fontSize: '0.55rem' }}>
            // standard PDF format
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageForeword;