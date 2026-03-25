// src/components/pages/PageChapter4.js
// Spread 5 — "The Codex" (Philosophy & Beliefs)
// Left: chapter title page
// Right: manifesto entries with reading list

import React from 'react';
import codexData from '../../data/codexData';

const PageChapter4 = ({ side }) => {
  if (side === 'left') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: 10 }}>
        <p className="chapter-label">Chapter IV</p>
        <div className="chapter-ornament" aria-hidden="true">✦</div>

        <h2 className="chapter-title">
          The<br />
          <span className="chapter-title-italic">Codex</span>
        </h2>

        <div className="chapter-divider">
          <span className="chapter-divider-symbol">📜</span>
        </div>

        <p className="chapter-subtitle">
          The principles I write code by.<br />
          The books that shaped me.<br />
          The beliefs I ship with.
        </p>

        <p style={{
          marginTop: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          color: 'var(--ink-muted)',
          letterSpacing: '0.1em',
          lineHeight: 1.7,
          textAlign: 'left',
          width: '100%',
          padding: '12px 0',
          borderTop: '1px solid var(--border-ink)',
        }}>
          {codexData.closingNote}
        </p>
      </div>
    );
  }

  // Right — principles + reading list
  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0, paddingRight: 4 }}>
      {/* Intro */}
      <p className="prose" style={{ fontSize: '0.82rem', marginBottom: 16 }}>
        {codexData.intro}
      </p>

      {/* Principles */}
      {codexData.principles.map((p, i) => (
        <div key={i} className="codex-entry">
          <div className="codex-label">{p.label}</div>
          <div className="codex-text">"{p.statement}"</div>
          <div className="codex-note">{p.note}</div>
        </div>
      ))}

      {/* Reading list */}
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-ink)' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
          marginBottom: 10,
        }}>
          // reading_list
        </p>
        {codexData.readingList.map((book, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--accent-rust)', minWidth: 16 }}>
              {i + 1}.
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--ink-primary)' }}>
                {book.title}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                {book.author} — <em>{book.note}</em>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageChapter4;
