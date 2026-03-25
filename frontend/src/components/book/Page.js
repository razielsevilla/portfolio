// src/components/book/Page.js
// Reusable page spread component.
// Each "spread" renders two <Page> instances — left and right.
// Exposes slots for content via children.

import React from 'react';

/**
 * RunningHeader — mimics a printed book running title.
 * leftText: author name or blank  (left page)
 * rightText: chapter title        (right page)
 */
export const RunningHeader = ({ leftText, rightText, isLeftPage }) => (
  <div className="running-header">
    {isLeftPage ? (
      <>
        <span className="running-header-left">{leftText}</span>
        <span className="running-header-center">✦</span>
        <span className="running-header-right" />
      </>
    ) : (
      <>
        <span className="running-header-left" />
        <span className="running-header-center">✦</span>
        <span className="running-header-right">{rightText}</span>
      </>
    )}
  </div>
);

/**
 * PageNumber — classic "— N —" centered at foot.
 */
export const PageNum = ({ number }) => (
  <div className="page-number">{number}</div>
);

/**
 * Page — the outer page element.
 * Used as direct child of HTMLFlipBook.
 * Passes ref down correctly for react-pageflip.
 */
const Page = React.forwardRef(({ children, isLeft, className = '' }, ref) => (
  <div
    ref={ref}
    className={`book-page paper-texture ${isLeft ? 'page-left' : ''} ${className}`}
  >
    {children}
  </div>
));

Page.displayName = 'Page';

export default Page;
