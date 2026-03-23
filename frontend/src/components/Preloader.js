// src/components/Preloader.js
import React, { useEffect, useState } from 'react';
import '../styles/Preloader.css';

// 💡 Move this outside to ensure the reference is stable for React's dependency tracking
const FULL_TEXT = [
  "> INITIALIZING SYSTEM...",
  "> LOADING ASSETS...",
  "> CONNECTING TO SERVER...",
  "> DECRYPTING PROFILE...",
  "> ACCESS GRANTED."
];

const Preloader = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < FULL_TEXT.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + (prev ? '\n' : '') + FULL_TEXT[lineIndex]);
        setLineIndex(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      // All lines done, wait for final transition
      const finishTimeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(finishTimeout);
    }
    // 💡 Added onComplete to dependencies to satisfy React 19 best practices
  }, [lineIndex, onComplete]);

  return (
    <div className="preloader">
      <div className="terminal-text">
        {text}
        <span className="cursor">_</span>
      </div>
    </div>
  );
};

export default Preloader;