import React from 'react';
import { SPREADS, CHAPTER_FIRST_SPREAD } from '../../data/spreads';

/**
 * TableOfContents component — A slide-over drawer for site-wide navigation.
 * Displays a list of chapters and handles navigation jumps via the onNavigate prop.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Whether the ToC drawer is visible.
 * @param {Function} props.onClose - Callback to close the drawer.
 * @param {number} props.currentSpread - The index of the currently active spread.
 * @param {Function} props.onNavigate - Callback to trigger navigation to a spread index.
 */
const TOC_ITEMS = [
  {
    chapter: 'foreword',
    num: '00',
    title: 'Foreword',
    tagline: 'A Note from the Author',
  },
  {
    chapter: 'chapter1',
    num: 'I',
    title: 'The Story So Far',
    tagline: 'Experience & Milestones',
  },
  {
    chapter: 'chapter2',
    num: 'II',
    title: 'Tools of the Trade',
    tagline: 'Skills & Pillars',
  },
  {
    chapter: 'chapter3',
    num: 'III',
    title: 'Works Published',
    tagline: 'Projects & Prototypes',
  },
  {
    chapter: 'invitation',
    num: 'IV',
    title: 'The Next Chapter',
    tagline: 'An Open Invitation',
  },
];

/**
 * TableOfContents component — A slide-over drawer for site-wide navigation.
 */
const TableOfContents = ({ isOpen, onClose, currentSpread = 0, onNavigate }) => {

  /**
   * Triggers navigation to the first spread of a specific chapter.
   *
   * @param {string} chapterKey - The key of the chapter to jump to.
   */
  const handleJump = (chapterKey) => {
    const spreadIdx = CHAPTER_FIRST_SPREAD[chapterKey];
    if (spreadIdx !== undefined && onNavigate) {
      onNavigate(spreadIdx);
    }
    onClose();
  };

  return (
    <>
      {/* Dimmed backdrop */}
      <div
        className={`toc-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* The Bookmark Ribbon */}
      <aside className={`toc-ribbon ${isOpen ? 'open' : ''}`} aria-label="Table of Contents">
        {/* Decorative Top (string/seal) */}
        <div className="toc-ribbon-top" aria-hidden="true">
          <div className="toc-ribbon-string" />
          <div className="toc-ribbon-seal">❧</div>
        </div>

        <header className="toc-header">
          <h2 className="toc-title">Contents</h2>
          <div className="toc-divider" />
        </header>

        <nav className="toc-nav">
          <ul className="toc-list">
            {TOC_ITEMS.map((item) => {
              const spreadIdx = CHAPTER_FIRST_SPREAD[item.chapter];
              const isActive = SPREADS[currentSpread]?.chapter === item.chapter;
              const pageNum = spreadIdx !== undefined ? spreadIdx * 2 + 1 : null;

              return (
                <li key={item.chapter}>
                  <button
                    className={`toc-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleJump(item.chapter)}
                  >
                    <div className="toc-item-indicator" aria-hidden="true" />
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

        {/* Decorative Bottom (V-notch) */}
        <div className="toc-ribbon-bottom" aria-hidden="true">
          <div className="toc-ribbon-notch" />
        </div>

        <button onClick={onClose} className="toc-close-btn" aria-label="Close contents">
          <i className="fas fa-times" />
        </button>
      </aside>
    </>
  );
};

export default TableOfContents;
