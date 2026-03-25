// src/hooks/usePageSound.js

import { useCallback, useRef } from 'react';
import { AUDIO_PATHS, AUDIO_CONFIG } from '../constants';

/**
 * Custom hook to handle page turn sound effects.
 * Manages audio singleton and provides a play function.
 * 
 * @returns {Function} playSound - Function to play the page turn sound.
 */
export const usePageSound = () => {
  const audioRef = useRef(null);

  const playSound = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(AUDIO_PATHS.PAGE_TURN);
        audioRef.current.volume = AUDIO_CONFIG.VOLUME;
      }

      // Reset to start if already playing
      audioRef.current.currentTime = 0;
      
      // Handle play promise (browsers may block auto-play)
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Log only in development or handle silently for production-grade UX
          console.warn('Audio playback prevented:', error);
        });
      }
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }, []);

  return playSound;
};

export default usePageSound;
