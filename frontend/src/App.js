// src/App.js

import React, { useState, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PixelTrail from './components/PixelTrail';
import Preloader from './components/Preloader';
import ScrollReveal from './components/ScrollReveal';
import Skills from './components/Skills';

function App() {
  const [loading, setLoading] = useState(true);

  // 💡 Memoize the complete handler to prevent unnecessary re-renders 
  // and ensure stable behavior during testing
  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader onComplete={handleLoadingComplete} />
      ) : (
        <div className="portfolio-app fade-in-content">

          <PixelTrail />
          <Header />

          <main>
            {/* Hero is usually static for instant impact upon loading */}
            <Hero />

            <ScrollReveal>
              <Experience />
            </ScrollReveal>

            <ScrollReveal>
              <Skills />
            </ScrollReveal>

            <ScrollReveal>
              <Projects />
            </ScrollReveal>

            <ScrollReveal>
              <Certificates />
            </ScrollReveal>

            <ScrollReveal>
              <Contact />
            </ScrollReveal>

          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;