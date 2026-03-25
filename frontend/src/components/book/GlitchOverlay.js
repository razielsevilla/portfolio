// src/components/book/GlitchOverlay.js
// Dramatic glitch effect fired on every page flip.
// Uses rapid CSS animation bursts with RGB channel shifting,
// scan lines and random horizontal displacement bars.

import React, { useEffect, useRef } from 'react';

const GlitchOverlay = ({ isActive, onComplete }) => {
  const overlayRef = useRef(null);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    if (!isActive) return;

    const el = overlayRef.current;
    if (!el) return;

    // Clear any running timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // ── PHASE 1: Scanline burst (0ms)
    const scanline = el.querySelector('.glitch-scanline');
    const rgbShift  = el.querySelector('.glitch-rgb-shift');

    scanline.style.opacity = '1';
    scanline.style.animation = 'none';
    void scanline.offsetWidth;
    scanline.style.animation = 'glitch-scanline-pulse 0.08s steps(1) 4';

    // ── PHASE 2: RGB channel shift bars (15ms)
    const t1 = setTimeout(() => {
      rgbShift.style.opacity  = '1';
      rgbShift.style.animation = 'none';
      void rgbShift.offsetWidth;
      rgbShift.style.animation = 'glitch-rgb 0.06s steps(1) 3';

      // Fire random displacement bars
      fireDisplacementBars(el);
    }, 15);
    timeoutsRef.current.push(t1);

    // ── PHASE 3: Second wave (50ms) — the "is this my device?" moment
    const t2 = setTimeout(() => {
      scanline.style.animation = 'none';
      void scanline.offsetWidth;
      scanline.style.animation = 'glitch-scanline-pulse 0.1s steps(1) 6';
      rgbShift.style.animation  = 'none';
      void rgbShift.offsetWidth;
      rgbShift.style.animation  = 'glitch-rgb 0.05s steps(1) 5';
      fireDisplacementBars(el);
    }, 50);
    timeoutsRef.current.push(t2);

    // ── PHASE 4: Color bleed frame (90ms)
    const t3 = setTimeout(() => {
      el.style.background = 'rgba(0,255,65,0.04)';
    }, 90);
    timeoutsRef.current.push(t3);

    // ── PHASE 5: Full recovery (130ms)
    const t4 = setTimeout(() => {
      scanline.style.animation  = 'none';
      rgbShift.style.animation  = 'none';
      scanline.style.opacity    = '0';
      rgbShift.style.opacity    = '0';
      el.style.background       = 'transparent';
      // Clear displacement bars
      el.querySelectorAll('.glitch-disp-bar').forEach(b => b.remove());
      onComplete && onComplete();
    }, 160);
    timeoutsRef.current.push(t4);

    return () => timeoutsRef.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <>
      <style>{`
        @keyframes glitch-scanline-pulse {
          0%   { opacity: 0; transform: translateY(0); }
          25%  { opacity: 0.85; transform: translateY(-4px) skewX(-2deg); }
          50%  { opacity: 0.4;  transform: translateY(8px); }
          75%  { opacity: 0.9;  transform: translateY(-2px) skewX(3deg); }
          100% { opacity: 0; }
        }
        @keyframes glitch-rgb {
          0%   { opacity: 0; transform: translateX(0); }
          20%  { opacity: 0.7; transform: translateX(-6px); filter: hue-rotate(90deg); }
          40%  { opacity: 0.5; transform: translateX(10px); filter: hue-rotate(180deg); }
          60%  { opacity: 0.8; transform: translateX(-3px) scaleY(1.02); filter: hue-rotate(270deg); }
          80%  { opacity: 0.3; transform: translateX(5px); }
          100% { opacity: 0; transform: translateX(0); }
        }
      `}</style>
      <div
        ref={overlayRef}
        className="glitch-overlay"
        aria-hidden="true"
        style={{
          display: isActive ? 'block' : 'none',
          background: 'transparent',
          transition: 'background 0.03s',
        }}
      >
        <div className="glitch-scanline" style={{ opacity: 0 }} />
        <div className="glitch-rgb-shift" style={{ opacity: 0 }} />
      </div>
    </>
  );
};

/** Spawns 4–8 random horizontal displacement bars */
function fireDisplacementBars(container) {
  const count  = Math.floor(Math.random() * 5) + 4;
  const colors = ['#00ff41', '#ff003c', '#00cfff', '#ffffff'];

  for (let i = 0; i < count; i++) {
    const bar       = document.createElement('div');
    bar.className   = 'glitch-disp-bar';
    const top       = Math.random() * 100;
    const height    = Math.random() * 4 + 1;
    const offset    = (Math.random() - 0.5) * 24;
    const color     = colors[Math.floor(Math.random() * colors.length)];
    const delay     = Math.random() * 60;

    Object.assign(bar.style, {
      position:    'absolute',
      left:        '0',
      right:       '0',
      top:         `${top}%`,
      height:      `${height}px`,
      background:  color,
      opacity:     '0.6',
      transform:   `translateX(${offset}px)`,
      mixBlendMode: 'screen',
      zIndex:       '998',
      animation:   `glitch-disp-fade 0.07s ease ${delay}ms both`,
    });

    // Inject keyframe if not already present
    if (!document.getElementById('glitch-disp-kf')) {
      const style = document.createElement('style');
      style.id    = 'glitch-disp-kf';
      style.innerHTML = `
        @keyframes glitch-disp-fade {
          0%   { opacity: 0.6; }
          100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    container.appendChild(bar);
    setTimeout(() => bar.remove(), 200);
  }
}

export default GlitchOverlay;
