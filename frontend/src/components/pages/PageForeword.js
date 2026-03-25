// src/components/pages/PageForeword.js
import React from 'react';
import codexData from '../../data/codexData';
import contactData from '../../data/contactData';

const PageForeword = ({ side }) => {
  if (side === 'left') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: 10 }}>
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

        <div style={{ marginTop: 'auto', padding: '10px 0', borderTop: '1px solid var(--border-ink)', width: '100%', textAlign: 'left' }}>
          <p className="code-comment">// This portfolio is a living document.</p>
          <p className="code-comment">// It treats projects as published works</p>
          <p className="code-comment">// and commits as draft revisions.</p>
        </div>
      </div>
    );
  }

  // Right page
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <p className="prose" style={{ fontSize: '0.85rem' }}>
        {codexData.intro}
      </p>

      {/* Prominent Access CV Button */}
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <a 
          href={contactData.resumeUrl || "#"} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="invitation-seal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 24px',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--bg-page)',
            background: 'var(--accent-rust)',
            border: '1px solid var(--accent-rust)',
            borderRadius: 2,
            transition: 'all var(--transition-smooth)',
            boxShadow: '0 4px 12px rgba(139, 69, 19, 0.15)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--accent-rust)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--accent-rust)';
            e.currentTarget.style.color = 'var(--bg-page)';
          }}
        >
          <i className="fas fa-file-pdf" aria-hidden="true" />
          Access Curriculum Vitae
        </a>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: 'var(--ink-muted)',
          marginTop: 12,
          letterSpacing: '0.1em'
        }}>
          // standard PDF format
        </p>
      </div>
    </div>
  );
};

export default PageForeword;
