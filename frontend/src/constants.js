// src/constants.js

/**
 * Application-wide constants for the Living Codex.
 */

export const EDITIONS = {
  DAY: 'day',
  NIGHT: 'night',
};

export const STORAGE_KEYS = {
  EDITION: 'codex-edition',
};

export const BOOK_CONFIG = {
  WIDTH: 550,
  HEIGHT: 720,
  MIN_WIDTH: 320,
  MAX_WIDTH: 600,
  MIN_HEIGHT: 480,
  MAX_HEIGHT: 750,
  SHADOW_OPACITY: 0.55,
  FLIP_TIME: 850,
  SWIPE_DISTANCE: 50,
};

export const TIER_CONFIG = {
  core: { label: '[ CORE ]', color: 'var(--accent-rust)', bg: 'rgba(139,69,19,0.08)' },
  extended: { label: '[ EXTENDED ]', color: 'var(--ink-code)', bg: 'rgba(124,252,138,0.06)' },
  research: { label: '[ FRONTIER ]', color: 'var(--ink-muted)', bg: 'rgba(138,125,110,0.08)' },
};

export const STATUS_LABELS = {
  live: 'Published',
  'in-progress': 'In Press',
  'case-study': 'Case Study',
  archived: 'Archived',
};

export const AUDIO_PATHS = {
  PAGE_TURN: '/sounds/page-turn.mp3',
};

export const AUDIO_CONFIG = {
  VOLUME: 0.45,
};
