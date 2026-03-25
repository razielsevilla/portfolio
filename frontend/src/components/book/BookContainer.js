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
import BookmarkRibbon from './BookmarkRibbon';
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
        // Use turnToPage for more robust jumping compared to flip()
        const flipObj = bookRef.current.pageFlip();
        if (flipObj) {
          flipObj.turnToPage(idx * 2);
        }
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

      {/* Relative stage for the physical book + anchored bookmarks */}
      <div className="book-stage">
        {/* Physical bookmark ribbon on right edge of book */}
        <BookmarkRibbon onClick={() => onSpreadChange('open-toc')} />

        <HTMLFlipBook
          width={BOOK_CONFIG.WIDTH}
          height={BOOK_CONFIG.HEIGHT}
          size="fixed"
          minWidth={BOOK_CONFIG.MIN_WIDTH}
          maxWidth={BOOK_CONFIG.MAX_WIDTH}
          minHeight={BOOK_CONFIG.MIN_HEIGHT}
          maxHeight={BOOK_CONFIG.MAX_HEIGHT}
          flippingTime={BOOK_CONFIG.FLIP_TIME}
          usePortrait={false}
          startPage={0}
          autoSize={true}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="book-main-engine"
          ref={bookRef}
        >
          {SPREADS.map((spread, idx) => {
            const key = spread.key || `spread-${idx}`;

            return [
              <FlipPage key={`${key}-L`} className="book-page paper-texture page-left">
                <div className="book-page-inner">
                  {/* Decorative page wash - unique per page */}
                  <div className="page-wash" />

                  <RunningHeader
                    leftText="Raziel Sevilla"
                    isLeftPage={true}
                  />
                  <spread.Component
                    pageIndex={spread.pageIndex}
                    side="left"
                    currentSpread={idx}
                    onNavigate={onSpreadChange}
                  />
                  <PageNum number={idx * 2 + 1} />
                </div>
              </FlipPage>,
              <FlipPage key={`${key}-R`} className="book-page paper-texture page-right">
                <div className="book-page-inner">
                  <div className="page-wash" />

                  <RunningHeader
                    rightText={spread.chapterLabel}
                    isLeftPage={false}
                  />
                  <spread.Component
                    pageIndex={spread.pageIndex}
                    side="right"
                    currentSpread={idx}
                    onNavigate={onSpreadChange}
                  />
                  <PageNum number={idx * 2 + 2} />
                </div>
              </FlipPage>,
            ];
          })}
        </HTMLFlipBook>
      </div>

      <InkCodeReveal isActive={revealing} onComplete={handleRevealDone} />


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
