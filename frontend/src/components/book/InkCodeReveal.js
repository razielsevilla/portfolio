// src/components/book/InkCodeReveal.js
// Replaces GlitchOverlay with a thematically meaningful "code-to-prose" transition.
//
// The metaphor: every page starts as raw code. Reading humanizes it.
// On flip, a curtain of green monospace characters wipes across the page
// (left-to-right like a terminal rendering text), then dissolves cleanly
// into the warm book beneath. The tech layer and book layer become one gesture.

import React, { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/{}[]()=;:.*#@!?_-+';

const InkCodeReveal = ({ isActive, onComplete }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const startRef  = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const ctx      = canvas.getContext('2d');
    const cols     = Math.ceil(W / 14);
    const rows     = Math.ceil(H / 20);
    const DURATION = 520;   // ms total
    const WAVE_W   = 0.35;  // wave width as fraction of screen

    startRef.current = performance.now();

    const draw = (now) => {
      const elapsed  = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);  // 0 → 1

      // Each column activates based on its position in the wave
      // The wave front moves left → right, then chars dissolve behind it
      ctx.clearRect(0, 0, W, H);

      for (let c = 0; c < cols; c++) {
        const colFrac = c / cols;

        // Wave front position (0→1 across screen)
        const frontPos = progress / (1 - WAVE_W);

        // This column is "active" (showing code) if wave has passed it
        // and dissolution hasn't erased it yet
        const activated = colFrac < progress / (1 - WAVE_W * 0.5);
        const dissolved = colFrac < (progress - WAVE_W) / (1 - WAVE_W);

        if (!activated || dissolved) continue;

        // Dissolution fade: chars near the wave tail start fading
        const tailFrac = (colFrac - (progress - WAVE_W) / (1 - WAVE_W));
        const alpha    = Math.min(1, tailFrac * 6);

        for (let r = 0; r < rows; r++) {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          const x    = c * 14 + 2;
          const y    = r * 20 + 16;

          // Leading edge glow
          const isLead = Math.abs(colFrac - frontPos) < 0.04;

          ctx.globalAlpha = alpha * (isLead ? 1 : 0.65);
          ctx.font        = `${isLead ? 13 : 11}px 'JetBrains Mono', monospace`;
          ctx.fillStyle   = isLead ? '#00ff88' : 'rgba(100,220,130,0.9)';

          // Night edition uses brighter green
          if (document.documentElement.getAttribute('data-edition') === 'night') {
            ctx.fillStyle = isLead ? '#7CFC8A' : 'rgba(124,252,138,0.75)';
          }

          ctx.fillText(char, x, y);
        }
      }

      ctx.globalAlpha = 1;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, W, H);
        onComplete && onComplete();
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         999,
        pointerEvents:  'none',
        display:        isActive ? 'block' : 'none',
        mixBlendMode:   'screen',
      }}
    />
  );
};

export default InkCodeReveal;
