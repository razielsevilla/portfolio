import React, { useState, useCallback, useEffect, useRef } from 'react';
import BookCover from './BookCover';
import BookContainer from './BookContainer';
import EditionToggle from './EditionToggle';
import BookmarkRibbon from './BookmarkRibbon';
import TableOfContents from './TableOfContents';
import { EDITIONS, STORAGE_KEYS } from '../../constants';

/**
 * Root wrapper for the entire Living Codex experience.
 * Manages global application state: edition (day/night), ToC visibility,
 * and handles navigation through the BookContainer ref.
 */
const BookShell = () => {
  const [loaded, setLoaded] = useState(false);
  const [edition, setEdition] = useState(EDITIONS.DAY);
  const [tocOpen, setTocOpen] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);

  const bookRef = useRef(null);

  /**
   * Persist edition preference on mount.
   */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EDITION);
    if (saved === EDITIONS.DAY || saved === EDITIONS.NIGHT) {
      setEdition(saved);
    }
  }, []);

  /**
   * Apply edition to <html> and localStorage when it changes.
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-edition', edition);
    localStorage.setItem(STORAGE_KEYS.EDITION, edition);
  }, [edition]);

  /**
   * Toggles between day and night editions.
   */
  const toggleEdition = useCallback(() => {
    setEdition((prev) => (prev === EDITIONS.DAY ? EDITIONS.NIGHT : EDITIONS.DAY));
  }, []);

  /**
   * Handles navigation to a specific spread using the BookContainer ref.
   *
   * @param {number} spreadIdx - The index of the spread to navigate to.
   */
  const handleNavigate = useCallback((spreadIdx) => {
    if (bookRef.current) {
      bookRef.current.goToSpread(spreadIdx);
    }
    setCurrentSpread(spreadIdx);
    setTocOpen(false); // Close ToC after navigation
  }, []);

  return (
    <div className="book-shell" data-edition={edition}>
      {/* Book cover preloader — shows until loaded */}
      {!loaded && <BookCover onComplete={() => setLoaded(true)} />}

      {/* Main book — always mounted for flip-engine initialization */}
      <div
        style={{
          visibility: loaded ? 'visible' : 'hidden',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BookContainer ref={bookRef} onSpreadChange={setCurrentSpread} />
      </div>

      {/* Fixed chrome — only visible once cover is gone */}
      {loaded && (
        <>
          <EditionToggle edition={edition} onToggle={toggleEdition} />
          <BookmarkRibbon onClick={() => setTocOpen(true)} />
          <TableOfContents
            isOpen={tocOpen}
            onClose={() => setTocOpen(false)}
            currentSpread={currentSpread}
            onNavigate={handleNavigate}
          />
        </>
      )}
    </div>
  );
};

export default BookShell;
