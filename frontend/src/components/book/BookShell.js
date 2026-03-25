// src/components/book/BookShell.js
// Root wrapper for the entire Living Codex experience.
// Manages: edition (day/night), ToC visibility, cover state,
// and passes spread index down to BookmarkRibbon for active ToC item.

import React, { useState, useCallback, useEffect } from 'react';
import BookCover       from './BookCover';
import BookContainer, { bookGoToSpread } from './BookContainer';
import EditionToggle   from './EditionToggle';
import BookmarkRibbon  from './BookmarkRibbon';
import TableOfContents from './TableOfContents';

const BookShell = () => {
  const [loaded,       setLoaded]       = useState(false);   // cover done
  const [edition,      setEdition]      = useState('day');   // 'day' | 'night'
  const [tocOpen,      setTocOpen]      = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);

  // Persist edition preference
  useEffect(() => {
    const saved = localStorage.getItem('codex-edition');
    if (saved === 'day' || saved === 'night') setEdition(saved);
  }, []);

  // Apply edition to <html> so all CSS vars react
  useEffect(() => {
    document.documentElement.setAttribute('data-edition', edition);
    localStorage.setItem('codex-edition', edition);
  }, [edition]);

  const toggleEdition = useCallback(() => {
    setEdition(prev => prev === 'day' ? 'night' : 'day');
  }, []);

  const handleNavigate = useCallback((spreadIdx) => {
    bookGoToSpread(spreadIdx);
    setCurrentSpread(spreadIdx);
  }, []);

  return (
    <div className="book-shell" data-edition={edition}>
      {/* Book cover preloader — shows until loaded */}
      {!loaded && (
        <BookCover onComplete={() => setLoaded(true)} />
      )}

      {/* Main book — always mounted so react-pageflip initialises */}
      <div style={{ visibility: loaded ? 'visible' : 'hidden', width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <BookContainer onSpreadChange={setCurrentSpread} />
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
