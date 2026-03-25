// src/components/book/BookmarkRibbon.js
// Fixed right-edge bookmark ribbon — opens the Table of Contents.

import React from 'react';

const BookmarkRibbon = ({ onClick }) => (
  <div className="bookmark-ribbon" onClick={onClick} role="button" aria-label="Open table of contents" tabIndex={0}
    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}>
    <div className="bookmark-ribbon-body" style={{ position: 'relative' }}>
      <i className="fas fa-bookmark" style={{ color: '#fff', fontSize: '0.8rem' }} aria-hidden="true" />
      <span className="bookmark-ribbon-icon">Contents</span>
    </div>
  </div>
);

export default BookmarkRibbon;
