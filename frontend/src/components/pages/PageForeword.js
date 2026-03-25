// src/components/pages/PageForeword.js
import React from 'react';
import heroData from '../../data/heroData';

const PageForeword = ({ side }) => {
  // Left Page: Title and Chapter Details
  if (side === 'left') {
    return (
      <div className="book-page-inner" style={{ paddingTop: '60px', textAlign: 'center' }}>
        <p className="chapter-label">Foreword</p>
        <div className="chapter-ornament" aria-hidden="true">✦</div>

        <h2 className="chapter-title">
          A Note from<br />
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
        <div style={{ marginTop: 'auto', padding: '10px 0', borderTop: '1px solid var(--border-ink)', textAlign: 'left' }}>
          <p className="code-comment">// This portfolio is a living document.</p>
          <p className="code-comment">// It treats projects as published works</p>
          <p className="code-comment">// and commits as draft revisions.</p>
        </div>
      </div>
    );
  }

  // Right Page: Main Content and CTA
  return (
    <div className="book-page-inner" style={{ paddingTop: '25px' }}>
      <div className="prose">
        {/* Using Drop Cap for the first paragraph */}
        <p className="drop-cap">
          {heroData.descriptionOne}
        </p>
        <p>{heroData.descriptionTwo}</p>
        <p>{heroData.descriptionThree}</p>
      </div>

      {/* Signature & CTA Section */}
      <div style={{ marginTop: '15px', textAlign: 'right', paddingRight: '10px' }}>
        <p className="foreword-name-display">
          {heroData.name}
        </p>
        <p className="code-comment" style={{ marginTop: '1px', marginBottom: '12px' }}>
          // Full-Stack Developer
        </p>

        {/* Prominent Access CV Button - Now Right Aligned */}
        <div style={{ display: 'inline-block', textAlign: 'center' }}>
          <a
            href={heroData.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="invitation-seal"
            style={{
              background: 'var(--accent-rust)',
              color: 'var(--bg-page)',
              borderColor: 'var(--accent-rust)',
              boxShadow: '0 4px 12px rgba(139, 69, 19, 0.15)',
              padding: '8px 20px',
              fontSize: '0.65rem'
            }}
          >
            <i className="fas fa-file-pdf me-2" aria-hidden="true" />
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