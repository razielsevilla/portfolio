import React from 'react';

/**
 * PaperAirplane component — A simple SVG paper airplane for animations.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.style - Inline styles for position and animation.
 */
const PaperAirplane = ({ style }) => (
  <svg
    viewBox="0 0 48 48"
    width="38"
    height="38"
    style={style}
    aria-hidden="true"
  >
    <polygon
      points="2,24 46,4 30,44"
      fill="var(--bg-page)"
      stroke="var(--accent-rust)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <line
      x1="30"
      y1="44"
      x2="20"
      y2="26"
      stroke="var(--accent-rust)"
      strokeWidth="1"
      opacity="0.5"
    />
    <line
      x1="2"
      y1="24"
      x2="30"
      y2="44"
      stroke="var(--accent-rust)"
      strokeWidth="0.8"
      opacity="0.35"
      strokeDasharray="3 2"
    />
  </svg>
);

export default PaperAirplane;
