// src/components/ThemeToggle.js — Delight #3: Icon Morph

import React, { useState, useEffect } from 'react';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
    // Reset animation flag after it completes
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn ${isAnimating ? 'morph' : ''}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Ripple burst — appears on every click */}
      {isAnimating && <span className="toggle-ripple" aria-hidden="true" />}

      <span className={`toggle-icon-wrap ${isAnimating ? 'spin-out' : ''}`}>
        {theme === 'light'
          ? <i className="fas fa-moon"  aria-hidden="true" />
          : <i className="fas fa-sun"   aria-hidden="true" />
        }
      </span>
    </button>
  );
};

export default ThemeToggle;