// src/components/book/SpineRibbon.js
// Left-edge book spine progress indicator.
// Shows per-chapter notch marks and an animated needle that moves
// with a spring easing as the user navigates spreads.

import React, { useMemo } from 'react';

const SpineRibbon = ({ currentSpread, totalSpreads, spreads }) => {
  // Collect the index of each chapter's first spread for notch positions
  const chapterNotches = useMemo(() => {
    const seen = new Set();
    return spreads
      .map((s, i) => ({ spread: s, idx: i }))
      .filter(({ spread }) => {
        if (spread.isChapterStart && !seen.has(spread.chapter)) {
          seen.add(spread.chapter);
          return true;
        }
        return false;
      });
  }, [spreads]);

  // Needle position as % from top
  const needlePercent = totalSpreads > 1
    ? (currentSpread / (totalSpreads - 1)) * 80 + 10  // 10%→90% range
    : 10;

  return (
    <div className="spine-ribbon" aria-hidden="true">
      {/* Chapter notch marks */}
      {chapterNotches.map(({ spread, idx }) => {
        const pct = totalSpreads > 1
          ? (idx / (totalSpreads - 1)) * 80 + 10
          : 10;
        const isActive = spreads[currentSpread]?.chapter === spread.chapter;
        return (
          <div
            key={spread.chapter}
            className={`spine-ribbon-notch${isActive ? ' active' : ''}`}
            style={{ top: `${pct}%` }}
            title={spread.navLabel}
          />
        );
      })}

      {/* Animated needle */}
      <div
        className="spine-ribbon-needle"
        style={{ top: `${needlePercent}%` }}
      />
    </div>
  );
};

export default SpineRibbon;
