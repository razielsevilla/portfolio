// src/components/book/BookCover.js
// Animated hardcover book that opens as the preloader replacement.
// Uses framer-motion for the cover-open sequence.

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookCover = ({ onComplete }) => {
  const [phase, setPhase] = useState('closed'); // closed | typing | opening | done

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase('typing'),  600);
    const t2 = setTimeout(() => setPhase('opening'), 2800);
    const t3 = setTimeout(() => { setPhase('done'); onComplete && onComplete(); }, 4600);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="book-cover-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
        key="cover"
      >
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,105,20,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* The Book */}
        <motion.div
          className="book-cover-3d"
          initial={{ rotateY: 0, scale: 0.85 }}
          animate={
            phase === 'opening'
              ? { rotateY: -35, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
              : { scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
          }
          style={{ perspective: 2000 }}
        >
          {/* Spine */}
          <div className="cover-spine" />

          {/* Front cover */}
          <motion.div
            className="cover-front"
            animate={
              phase === 'opening'
                ? {
                    rotateY: -150,
                    transition: {
                      delay: 0.3,
                      duration: 1.6,
                      ease: [0.76, 0, 0.24, 1],
                    },
                  }
                : {}
            }
            style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
          >
            {/* Decorative border inset */}
            <div style={{
              position: 'absolute', inset: 20,
              border: '1px solid rgba(201,169,110,0.25)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', inset: 26,
              border: '1px solid rgba(201,169,110,0.12)',
              pointerEvents: 'none',
            }} />

            <div className="cover-ornament" aria-hidden="true">❧</div>

            <div className="cover-title" aria-label="Raziel Sevilla">
              Raziel Sevilla
            </div>

            <div className="cover-subtitle">
              {phase === 'typing' || phase === 'opening' ? (
                <TypingText text="A Living Codex" />
              ) : (
                <span style={{ opacity: 0 }}>_</span>
              )}
            </div>

            <div className="cover-ornament" aria-hidden="true" style={{ opacity: 0.3 }}>⁕</div>

            <div className="cover-author">
              Full-Stack Developer &nbsp;·&nbsp; Book Reader &nbsp;·&nbsp; Builder
            </div>
          </motion.div>

          {/* Pages peek (right side of cover) — visible as cover opens */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to left, #F5F0E8 0%, #EDE7D5 100%)',
              zIndex: -1,
              borderRadius: '0 2px 2px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            animate={
              phase === 'opening'
                ? { opacity: 1 }
                : { opacity: 0 }
            }
          >
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: '#4A3F35',
              opacity: 0.5,
              textAlign: 'center',
            }}>
              Begin reading…
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/** Character-by-character typing effect */
const TypingText = ({ text }) => {
  const [visible, setVisible] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisible(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {visible}
      <span style={{ borderRight: '2px solid rgba(201,169,110,0.7)', marginLeft: 1, animation: 'blink 0.8s step-end infinite' }}>
        <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
      </span>
    </span>
  );
};

export default BookCover;
