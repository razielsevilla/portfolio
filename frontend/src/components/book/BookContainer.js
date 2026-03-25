// src/components/book/BookContainer.js
// Central page-flip engine wrapping react-pageflip's HTMLFlipBook.
// Manages current spread, keyboard navigation, page-turn sound,
// and fires the InkCodeReveal transition on each flip.

import React, { useRef, useState, useEffect, useCallback, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import InkCodeReveal from './InkCodeReveal';
import { RunningHeader, PageNum } from './Page';

// Chapter page imports
import PageForeword    from '../pages/PageForeword';
import PageChapter1    from '../pages/PageChapter1';
import PageChapter2    from '../pages/PageChapter2';
import PageChapter3    from '../pages/PageChapter3';
import PageChapter4    from '../pages/PageChapter4';
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

const SPREADS = [
  { key: 'foreword',   label: 'Foreword'          },
  { key: 'chapter1',  label: 'The Story So Far'   },
  { key: 'chapter2',  label: 'Tools of the Trade' },
  { key: 'chapter3',  label: 'Works Published'    },
  { key: 'chapter4',  label: 'The Codex'          },
  { key: 'invitation',label: 'The Next Chapter'   },
];

const CHAPTER_LABELS = {
  foreword:   'Foreword',
  chapter1:   'Chapter I',
  chapter2:   'Chapter II',
  chapter3:   'Chapter III',
  chapter4:   'Chapter IV',
  invitation: 'Chapter V — Open',
};

const LEFT_CONTENTS = {
  foreword:   PageForeword,
  chapter1:   PageChapter1,
  chapter2:   PageChapter2,
  chapter3:   PageChapter3,
  chapter4:   PageChapter4,
  invitation: PageInvitation,
};

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

  // ── InkCodeReveal + Sound on flip
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

  // ── Navigate to specific spread
  const goToSpread = useCallback((idx) => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flip(idx * 2);
  }, []);

  useEffect(() => { window.__bookGoToSpread = goToSpread; }, [goToSpread]);

  // ── Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      // Prevent keyboard flip if user is typing in a textarea/input
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

  const progress = ((currentSpread) / (totalSpreads - 1)) * 100;

  return (
    <div className="book-container" role="main" aria-label="Portfolio book">
      {/* Ink-code reveal transition */}
      <InkCodeReveal isActive={revealing} onComplete={handleRevealDone} />

      {/* The flip book — click-to-flip DISABLED, only arrows/keyboard/swipe */}
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
        disableFlipByClick={true}   // ← FIXED: no accidental flips
      >
        {SPREADS.map((spread, idx) => {
          const LeftContent  = LEFT_CONTENTS[spread.key];
          const leftPageNum  = idx * 2 + 1;
          const rightPageNum = idx * 2 + 2;
          const chapterLabel = CHAPTER_LABELS[spread.key];

          return [
            // Left page
            <FlipPage key={`${spread.key}-L`} className="book-page paper-texture page-left">
              <div className="book-page-inner">
                <RunningHeader isLeftPage={true} leftText="Raziel Sevilla" />
                <div className="page-content-scroll">
                  <LeftContent side="left" />
                </div>
                <PageNum number={leftPageNum} />
              </div>
            </FlipPage>,

            // Right page
            <FlipPage key={`${spread.key}-R`} className="book-page paper-texture">
              <div className="book-page-inner">
                <RunningHeader isLeftPage={false} rightText={chapterLabel} />
                <div className="page-content-scroll">
                  <LeftContent side="right" />
                </div>
                <PageNum number={rightPageNum} />
              </div>
            </FlipPage>,
          ];
        })}
      </HTMLFlipBook>

      {/* Navigation */}
      <nav className="book-nav" aria-label="Page navigation">
        <button
          className="book-nav-btn"
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          disabled={currentSpread === 0}
          aria-label="Previous chapter"
          title="Previous (←)"
        >
          <i className="fas fa-chevron-left" aria-hidden="true" />
        </button>

        <span className="book-nav-chapter" aria-live="polite">
          {SPREADS[currentSpread]?.label}
        </span>

        <button
          className="book-nav-btn"
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          disabled={currentSpread === totalSpreads - 1}
          aria-label="Next chapter"
          title="Next (→)"
        >
          <i className="fas fa-chevron-right" aria-hidden="true" />
        </button>
      </nav>

      {/* Reading progress ribbon */}
      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export { BookContainer as default };
export const bookGoToSpread = (idx) => window.__bookGoToSpread?.(idx);
