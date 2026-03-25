// src/components/book/BookContainer.js
// Central page-flip engine wrapping react-pageflip's HTMLFlipBook.
// Supports multi-page chapters: each chapter can span multiple spreads.
// Navigation tracks spreads; ToC jumps to a chapter's first spread.

import React, { useRef, useState, useEffect, useCallback, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import InkCodeReveal from './InkCodeReveal';
import SpineRibbon   from './SpineRibbon';
import { RunningHeader, PageNum } from './Page';

// Chapter page imports
import PageForeword    from '../pages/PageForeword';
import PageChapter1    from '../pages/PageChapter1';
import PageChapter2    from '../pages/PageChapter2';
import PageChapter3    from '../pages/PageChapter3';
import PageInvitation  from '../pages/PageInvitation';

// Page-turn sound (loaded lazily)
let pageTurnAudio = null;
const getAudio = () => {
  if (!pageTurnAudio) {
    pageTurnAudio = new Audio('/sounds/page-turn.mp3');
    pageTurnAudio.volume = 0.45;
  }
  return pageTurnAudio;
};

// ── 18-PAGE (9-SPREAD) MANIFEST ──────────────────────────────────
export const SPREADS = [
  // Spread 0 (Pages 1 & 2)
  {
    key:        'foreword-0',
    chapter:    'foreword',
    pageIndex:  0,
    navLabel:   'Foreword',
    chapterLabel: 'Foreword',
    Component:  PageForeword,
    isChapterStart: true,
  },

  // Spread 1 (Pages 3 & 4)
  {
    key:        'chapter1-0',
    chapter:    'chapter1',
    pageIndex:  0,
    navLabel:   'The Story So Far',
    chapterLabel: 'Chapter I',
    Component:  PageChapter1,
    isChapterStart: true,
  },
  // Spread 2 (Pages 5 & 6)
  {
    key:        'chapter1-1',
    chapter:    'chapter1',
    pageIndex:  1,
    navLabel:   'The Story So Far',
    chapterLabel: 'Chapter I — cont.',
    Component:  PageChapter1,
    isChapterStart: false,
  },

  // Spread 3 (Pages 7 & 8)
  {
    key:        'chapter2-0',
    chapter:    'chapter2',
    pageIndex:  0,
    navLabel:   'Tools of the Trade',
    chapterLabel: 'Chapter II',
    Component:  PageChapter2,
    isChapterStart: true,
  },
  // Spread 4 (Pages 9 & 10)
  {
    key:        'chapter2-1',
    chapter:    'chapter2',
    pageIndex:  1,
    navLabel:   'Tools of the Trade',
    chapterLabel: 'Chapter II — cont.',
    Component:  PageChapter2,
    isChapterStart: false,
  },

  // Spread 5 (Pages 11 & 12)
  {
    key:        'chapter3-0',
    chapter:    'chapter3',
    pageIndex:  0,
    navLabel:   'Works Published',
    chapterLabel: 'Chapter III',
    Component:  PageChapter3,
    isChapterStart: true,
  },
  // Spread 6 (Pages 13 & 14)
  {
    key:        'chapter3-1',
    chapter:    'chapter3',
    pageIndex:  1,
    navLabel:   'Works Published',
    chapterLabel: 'Chapter III — cont.',
    Component:  PageChapter3,
    isChapterStart: false,
  },
  // Spread 7 (Pages 15 & 16)
  {
    key:        'chapter3-2',
    chapter:    'chapter3',
    pageIndex:  2,
    navLabel:   'Works Published',
    chapterLabel: 'Chapter III — cont.',
    Component:  PageChapter3,
    isChapterStart: false,
  },

  // Spread 8 (Pages 17 & 18)
  {
    key:        'invitation-0',
    chapter:    'invitation',
    pageIndex:  0,
    navLabel:   'The Next Chapter',
    chapterLabel: 'Chapter IV — Open',
    Component:  PageInvitation,
    isChapterStart: true,
  },
];

// Chapter-start spread index for ToC navigation
export const CHAPTER_FIRST_SPREAD = SPREADS.reduce((acc, s, i) => {
  if (s.isChapterStart) acc[s.chapter] = i;
  return acc;
}, {});

/** Wrapper that react-pageflip can attach refs to */
const FlipPage = forwardRef(({ children, className }, ref) => (
  <div ref={ref} className={className}>{children}</div>
));
FlipPage.displayName = 'FlipPage';

const BookContainer = ({ onSpreadChange }) => {
  const bookRef        = useRef(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [revealing,    setRevealing]      = useState(false);
  const totalSpreads   = SPREADS.length;

  const handleFlip = useCallback((e) => {
    const pageIdx   = e.data;
    const newSpread = Math.floor(pageIdx / 2);
    setCurrentSpread(newSpread);
    onSpreadChange && onSpreadChange(newSpread);

    // Play sound
    try { getAudio().currentTime = 0; getAudio().play().catch(() => {}); } catch {}

    // Fire ink-code reveal
    setRevealing(true);
  }, [onSpreadChange]);

  const handleRevealDone = useCallback(() => setRevealing(false), []);

  const goToSpread = useCallback((idx) => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flip(idx * 2);
  }, []);

  useEffect(() => { window.__bookGoToSpread = goToSpread; }, [goToSpread]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        bookRef.current?.pageFlip().flipNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        bookRef.current?.pageFlip().flipPrev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const progress = (currentSpread / (totalSpreads - 1)) * 100;

  return (
    <div className="book-container" role="main" aria-label="Portfolio book">
      <SpineRibbon
        currentSpread={currentSpread}
        totalSpreads={totalSpreads}
        spreads={SPREADS}
      />

      <InkCodeReveal isActive={revealing} onComplete={handleRevealDone} />

      <HTMLFlipBook
        ref={bookRef}
        width={550}
        height={720}
        size="fixed"
        minWidth={320}
        maxWidth={600}
        minHeight={480}
        maxHeight={750}
        maxShadowOpacity={0.55}
        showCover={false}
        mobileScrollSupport={true}
        onFlip={handleFlip}
        className="book-flip-root"
        style={{}}
        startPage={0}
        drawShadow={true}
        flippingTime={850}
        usePortrait={false}
        startZIndex={0}
        autoSize={false}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={50}
        showPageCorners={true}
        disableFlipByClick={true}
      >
        {SPREADS.map((spread, idx) => {
          const { Component, chapterLabel, pageIndex } = spread;
          const leftPageNum  = idx * 2 + 1;
          const rightPageNum = idx * 2 + 2;

          return [
            <FlipPage key={`${spread.key}-L`} className="book-page paper-texture page-left">
              <div className="book-page-inner">
                <RunningHeader isLeftPage={true} leftText="Raziel Sevilla" />
                <div className="page-content-scroll">
                  <Component side="left" pageIndex={pageIndex} />
                </div>
                <PageNum number={leftPageNum} />
              </div>
            </FlipPage>,

            <FlipPage key={`${spread.key}-R`} className="book-page paper-texture">
              <div className="book-page-inner">
                <RunningHeader isLeftPage={false} rightText={chapterLabel} />
                <div className="page-content-scroll">
                  <Component side="right" pageIndex={pageIndex} />
                </div>
                <PageNum number={rightPageNum} />
              </div>
            </FlipPage>,
          ];
        })}
      </HTMLFlipBook>

      <nav className="book-nav" aria-label="Page navigation">
        <button
          className="book-nav-btn"
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          disabled={currentSpread === 0}
          aria-label="Previous page"
          title="Previous (←)"
        >
          <i className="fas fa-chevron-left" aria-hidden="true" />
        </button>

        <span className="book-nav-chapter" aria-live="polite">
          {SPREADS[currentSpread]?.navLabel}
        </span>

        <button
          className="book-nav-btn"
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          disabled={currentSpread === totalSpreads - 1}
          aria-label="Next page"
          title="Next (→)"
        >
          <i className="fas fa-chevron-right" aria-hidden="true" />
        </button>
      </nav>

      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export { BookContainer as default };
export const bookGoToSpread = (idx) => window.__bookGoToSpread?.(idx);
