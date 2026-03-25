import React, { useRef, useEffect } from 'react';

/**
 * QuillSVG component — An animated SVG quill for the contact form.
 *
 * @param {Object} props - Component props.
 * @param {number} props.size - The height of the quill in pixels.
 */
const QuillSVG = ({ size = 50 }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    const t = setTimeout(() => {
      path.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)';
      path.style.strokeDashoffset = '0';
    }, 300);

    return () => clearTimeout(t);
  }, []);

  return (
    <svg
      viewBox="0 0 60 100"
      width={size * 0.6}
      height={size}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <path
        d="M30,8 C44,8 52,20 48,38 C44,56 30,72 26,86 C24,92 27,98 30,100"
        fill="none"
        stroke="var(--accent-rust)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        ref={pathRef}
        d="M30,8 L28,100"
        fill="none"
        stroke="var(--ink-muted)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <circle cx="28" cy="102" r="1.5" fill="var(--accent-rust)" opacity="0.7" />
      <path
        d="M30,16 C40,18 46,26 41,33"
        fill="none"
        stroke="var(--accent-rust)"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <path
        d="M29,28 C39,30 44,38 39,45"
        fill="none"
        stroke="var(--accent-rust)"
        strokeWidth="0.6"
        opacity="0.38"
      />
      <path
        d="M28,42 C38,44 42,52 37,59"
        fill="none"
        stroke="var(--accent-rust)"
        strokeWidth="0.6"
        opacity="0.25"
      />
    </svg>
  );
};

export default QuillSVG;
