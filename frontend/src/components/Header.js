// src/components/Header.js

import React, { useState } from 'react';
import { Link } from 'react-scroll';
import '../styles/Header.css';
import ThemeToggle from './ThemeToggle';
import { Logo, LogoText } from './Logo';

const NAV_SECTIONS = ['about', 'experience', 'skills', 'projects', 'certificates', 'contact'];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => setIsOpen(false);

  return (
    <header className="main-header">
      <div className="container-fluid">

        {/* Logo */}
        <Link
          className="navbar-brand"
          to="about"
          spy smooth offset={-70} duration={500}
          onClick={handleNavClick}
        >
          <Logo size="36px" color="var(--accent)" />
          <div className="d-none d-sm-block">
            <LogoText />
          </div>
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(v => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Nav links */}
        <div className={`navbar-collapse collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {NAV_SECTIONS.map((sectionId) => (
              <li className="nav-item" key={sectionId}>
                <Link
                  className="nav-link"
                  activeClass="nav-active"
                  to={sectionId}
                  spy smooth offset={-70} duration={450}
                  onClick={handleNavClick}
                >
                  {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
                </Link>
              </li>
            ))}

            <li className="nav-item ps-lg-2 d-flex align-items-center">
              <ThemeToggle />
            </li>
          </ul>
        </div>

      </div>
    </header>
  );
};

export default Header;