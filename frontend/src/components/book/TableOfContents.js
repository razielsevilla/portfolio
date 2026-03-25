// src/components/book/TableOfContents.js
import React from 'react';
import { CHAPTER_FIRST_SPREAD } from './BookContainer';

const TOC_ITEMS = [
  {
    chapter: 'foreword',
    num: '00',
    title: 'Foreword',
    tagline: 'A Note from the Author'
  },
  {
    chapter: 'chapter1',
    num: 'I',
    title: 'The Story So Far',
    tagline: 'Experience & Milestones'
  },
  {
    chapter: 'chapter2',
    num: 'II',
    title: 'Tools of the Trade',
    tagline: 'Skills & Pillars'
  },
  {
    chapter: 'chapter3',
    num: 'III',
    title: 'Works Published',
    tagline: 'Projects & Prototypes'
  },
  {
    chapter: 'invitation',
    num: 'IV',
    title: 'The Next Chapter',
    tagline: 'An Open Invitation'
  }
];

const TableOfContents = ({ isOpen, onClose, currentSpreadKey = 'foreword' }) => {
  const handleJump = (chapterKey) => {
    const spreadIdx = CHAPTER_FIRST_SPREAD[chapterKey];
    if (spreadIdx !== undefined && window.__bookGoToSpread) {
      window.__bookGoToSpread(spreadIdx);
    }
    // Always close ToC upon jumping
    onClose();
  };

  return (
    <>
      <div className={`toc-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} aria-hidden="true" />
      
      <aside className={`toc-drawer ${isOpen ? 'open' : ''}`} aria-label="Table of Contents">
        <header className="toc-header">
          <h2 className="toc-title">Table of Contents</h2>
          <p className="toc-subtitle">Raziel Sevilla — A Living Codex</p>
          <div style={{ height: 1, background: 'var(--border-ink)', marginTop: 16 }} />
        </header>

        <nav className="toc-nav">
          <ul className="toc-list">
            {TOC_ITEMS.map((item) => {
              const spreadIdx = CHAPTER_FIRST_SPREAD[item.chapter];
              const pageNum   = spreadIdx !== undefined ? (spreadIdx * 2 + 1) : '';
              const isActive  = currentSpreadKey === item.chapter;

              return (
                <li key={item.chapter}>
                  <button 
                    className={`toc-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleJump(item.chapter)}
                  >
                    <span className="toc-item-num">{item.num}</span>
                    <div className="toc-item-text">
                      <div className="toc-item-title">{item.title}</div>
                      <div className="toc-item-tagline">{item.tagline}</div>
                    </div>
                    {pageNum && <span className="toc-item-page">{pageNum}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <footer className="toc-footer">
          <button onClick={onClose} className="toc-close-btn">
            ← CLOSE
          </button>
        </footer>
      </aside>
    </>
  );
};

export default TableOfContents;
