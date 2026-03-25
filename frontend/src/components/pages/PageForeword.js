// src/components/pages/PageForeword.js — v2
// Foreword with strong visual hook: large name display, pull-quote, bigger drop cap

import React from 'react';
import heroData from '../../data/heroData';

const { name, title, description, resumeLink } = heroData;

const PageForeword = ({ side }) => {
  if (side === 'left') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: 6, position: 'relative' }}>

        {/* Ghost chapter number for depth */}
        <div className="chapter-giant-num" aria-hidden="true">00</div>

        <p className="chapter-label">— Foreword —</p>
        <div className="chapter-ornament" aria-hidden="true">✦ ✦ ✦</div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink-secondary)', marginBottom: 2 }}>
          A Note from the Author
        </h1>

        <div className="chapter-divider" style={{ margin: '10px 0' }}>
          <span className="chapter-divider-symbol">❧</span>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 12 }}>
          Written by
        </p>

        {/* Strong name hook */}
        <span className="foreword-name-display">{name}</span>

        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--accent-rust)', marginTop: 10 }}>
          {title}
        </p>

        {/* Pull quote — the immediate hook */}
        <div className="pull-quote" style={{ marginTop: 16, fontSize: '1.1rem' }}>
          I build for the web.<br />I read for the soul.
        </div>

        <div style={{ marginTop: 'auto', opacity: 0.25, fontSize: '1.5rem', color: 'var(--accent-gold)' }} aria-hidden="true">
          ⁂
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 0 }}>
      {/* Strong opening drop cap */}
      <div className="prose drop-cap">
        <p>
          {description}
        </p>
        <p style={{ marginTop: '1.4em' }}>
          I am a reader first. Before I am a developer, before I am an engineer,
          I am someone who reads — <span className="ink-highlight">books, codebases, documentation, people</span>. This portfolio
          is shaped in the image of that identity.
        </p>
        <p style={{ marginTop: '1.4em' }}>
          What you navigate here is not a list of accomplishments.
          It is a <span className="ink-highlight">story in progress</span> — each chapter a different facet of how I think and
          what I build.
        </p>
        <p style={{ marginTop: '1.6em', fontFamily: 'var(--font-mono)', fontSize: '0.75em', color: 'var(--ink-code)', lineHeight: 1.6 }}>
          {'// I build for the web, tinker with Machine Learning,'}<br />
          {'// and ship things that work.'}
        </p>
      </div>

      {/* Resume footnote */}
      <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border-ink)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ink-muted)' }}>¹</span>
        <a href={resumeLink} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.78rem', color: 'var(--accent-rust)', textDecoration: 'none' }}>
          Full curriculum vitae available on request. →
        </a>
      </div>
    </div>
  );
};

export default PageForeword;
