// src/App.js

import React, { useState } from 'react';
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

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <div className="portfolio-app fade-in-content">

          <PixelTrail />
          <Header />

          <main>
            {/* 💡 Wrap each section in ScrollReveal */}

            {/* Hero usually doesn't need scroll reveal as it's already visible, 
                but you can wrap it if you want the text to slide up on load. 
                Let's leave Hero static for instant impact, and animate the rest. */}
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