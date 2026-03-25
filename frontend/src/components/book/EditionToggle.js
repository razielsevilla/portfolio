// src/components/book/EditionToggle.js
// Day / Night edition switcher — replaces the old ThemeToggle.
// Writes data-edition attribute to <html> so all CSS vars react.

import React from 'react';

const EditionToggle = ({ edition, onToggle }) => {
  const isNight = edition === 'night';

  return (
    <button
      className="edition-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${isNight ? 'Day' : 'Night'} Edition`}
      title={isNight ? 'Switch to Day Edition' : 'Switch to Night Edition'}
    >
      <span className="edition-toggle-dot" aria-hidden="true" />
      {isNight ? 'Night Edition' : 'Day Edition'}
    </button>
  );
};

export default EditionToggle;
