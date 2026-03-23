// src/components/ScrollReveal.js
import React, { useState, useEffect, useRef } from 'react';
import '../styles/ScrollReveal.css';

const ScrollReveal = ({ children, width = '100%' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // 💡 Safety check: If the API is missing, just show the content immediately
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ width }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;