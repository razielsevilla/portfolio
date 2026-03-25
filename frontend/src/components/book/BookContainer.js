import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import HTMLFlipBook from 'react-pageflip';
import InkCodeReveal from './InkCodeReveal';
import SpineRibbon from './SpineRibbon';
import { RunningHeader, PageNum } from './Page';
import { SPREADS } from '../../data/spreads';
import { BOOK_CONFIG } from '../../constants';
import usePageSound from '../../hooks/usePageSound';

/**
 * FlipPage component to wrap book pages for react-pageflip.
 * Uses forwardRef to allow the flip engine to attach directly to the DOM element.
 */
const FlipPage = forwardRef(({ children, className }, ref) => (
  <div ref={ref} className={className}>
    {children}
  </div>
));
FlipPage.displayName = 'FlipPage';

/**
 * Central page-flip engine wrapping react-pageflip's HTMLFlipBook.
 * Manages the book's state, navigation, and rendering of spreads.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onSpreadChange - Callback fired when the current spread changes.
 * @param {React.Ref} ref - Ref to expose imperative methods (e.g., goToSpread).
 */
const BookContainer = forwardRef(({ onSpreadChange }, ref) => {
  const bookRef = useRef(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const playPageSound = usePageSound();

  const totalSpreads = SPREADS.length;

  /**
   * Expose the navigation method to parent components safely.
   */
  useImperativeHandle(ref, () => ({
    goToSpread: (idx) => {
      if (bookRef.current) {
        bookRef.current.pageFlip().flip(idx * 2);
      }
    },
    nextPage: () => bookRef.current?.pageFlip().flipNext(),
    prevPage: () => bookRef.current?.pageFlip().flipPrev(),
  }));

  /**
   * Handles the page flip event from the engine.
   */
  const handleFlip = useCallback(
    (e) => {
      const pageIdx = e.data;
      const newSpread = Math.floor(pageIdx / 2);
      setCurrentSpread(newSpread);
      if (onSpreadChange) onSpreadChange(newSpread);

      playPageSound();
      setRevealing(true);
    },
    [onSpreadChange, playPageSound]
  );

  const handleRevealDone = useCallback(() => setRevealing(false), []);

  /**
   * Keyboard navigation effect.
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInput = e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT';
      if (isInput) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        bookRef.current?.pageFlip().flipNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        bookRef.current?.pageFlip().flipPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
        width={BOOK_CONFIG.WIDTH}
        height={BOOK_CONFIG.HEIGHT}
        size="fixed"
        minWidth={BOOK_CONFIG.MIN_WIDTH}
        maxWidth={BOOK_CONFIG.MAX_WIDTH}
        minHeight={BOOK_CONFIG.MIN_HEIGHT}
        maxHeight={BOOK_CONFIG.MAX_HEIGHT}
        maxShadowOpacity={BOOK_CONFIG.SHADOW_OPACITY}
        showCover={false}
        mobileScrollSupport={true}
        onFlip={handleFlip}
        className="book-flip-root"
        startPage={0}
        drawShadow={true}
        flippingTime={BOOK_CONFIG.FLIP_TIME}
        usePortrait={false}
        startZIndex={0}
        autoSize={false}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={BOOK_CONFIG.SWIPE_DISTANCE}
        showPageCorners={true}
        disableFlipByClick={true}
      >
        {SPREADS.map((spread, idx) => {
          const { Component, chapterLabel, pageIndex, key } = spread;
          const leftPageNum = idx * 2 + 1;
          const rightPageNum = idx * 2 + 2;

          return [
            <FlipPage key={`${key}-L`} className="book-page paper-texture page-left">
              <div className="book-page-inner">
                <RunningHeader isLeftPage={true} leftText="Raziel Sevilla" />
                <div className="page-content-scroll">
                  <Component side="left" pageIndex={pageIndex} />
                </div>
                <PageNum number={leftPageNum} />
              </div>
            </FlipPage>,

            <FlipPage key={`${key}-R`} className="book-page paper-texture">
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
});

BookContainer.displayName = 'BookContainer';

export default BookContainer;
