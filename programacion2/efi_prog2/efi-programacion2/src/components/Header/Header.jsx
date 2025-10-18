// Header.jsx - Versión actualizada con íconos de React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';
import './Header.css';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importa los íconos

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);

    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header-wrapper">
      <TopBar />
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <Link to="/" className="header-logo" onClick={() => handleNavClick('home')}>
            <img 
              src="/echenique.jpg" 
              alt="Logo Echenique" 
              className="header-logo-image"
            />
            <div className="header-logo-text">
              <h2>ECHENIQUE</h2>
              <span>Soluciones Inmobiliarias</span>
            </div>
          </Link>

          <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
            <Link 
              to="/" 
              className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Inicio
            </Link>
            <Link 
              to="/about" 
              className={`nav-item ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              Nosotros
            </Link>
            <Link 
              to="/sale" 
              className={`nav-item ${currentPage === 'sale' ? 'active' : ''}`}
              onClick={() => handleNavClick('sale')}
            >
              Venta
            </Link>
            <Link 
              to="/rental" 
              className={`nav-item ${currentPage === 'rental' ? 'active' : ''}`}
              onClick={() => handleNavClick('rental')}
            >
              Alquiler
            </Link>
            <Link 
              to="/temporal" 
              className={`nav-item ${currentPage === 'temporal' ? 'active' : ''}`}
              onClick={() => handleNavClick('temporal')}
            >
              Temporal
            </Link>
            <Link 
              to="/contact" 
              className={`nav-item ${currentPage === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact')}
            >
              Contacto
            </Link>
          </nav>

          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;