// Header.jsx - Versión migrada a Tailwind CSS
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';
import './Header.css'; // Mantenemos solo las animaciones específicas
import { FaBars, FaTimes } from 'react-icons/fa';

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
    <div className="fixed top-0 w-full z-50">
      <TopBar />
      <header className={`
        w-full bg-white bg-opacity-98 backdrop-blur-lg transition-all duration-300
        border-b border-gray-100 font-inter uppercase 
        ${isScrolled ? 'py-3 shadow-lg' : 'py-4 shadow-sm'}
      `}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center no-underline text-inherit transition-opacity duration-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            onClick={() => handleNavClick('home')}
          >
            <img 
              src="/echenique.jpg" 
              alt="Logo Echenique" 
              className="w-16 h-16 object-contain border-none transition-transform duration-300 hover:scale-105"
            />
            <div className="ml-3">
              <h2 className="text-primary-dark text-xl font-bold font-jakarta tracking-tight mb-0.5">
                ECHENIQUE
              </h2>
              <span className="text-gray-500 text-xs font-medium tracking-wider uppercase block">
                Soluciones Inmobiliarias
              </span>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex gap-7">
            {['home', 'about', 'sale', 'rental', 'temporal', 'contact'].map((page) => (
              <Link 
                key={page}
                to={`/${page === 'home' ? '' : page}`}
                className={`
                  relative text-gray-600 font-medium no-underline py-1 transition-all duration-300 text-sm
                  hover:text-primary-dark
                  ${currentPage === page ? 'text-primary-dark font-semibold' : ''}
                `}
                onClick={() => handleNavClick(page)}
              >
                {page === 'home' && 'Inicio'}
                {page === 'about' && 'Nosotros'}
                {page === 'sale' && 'Venta'}
                {page === 'rental' && 'Alquiler'}
                {page === 'temporal' && 'Temporal'}
                {page === 'contact' && 'Contacto'}
                
                {/* Active indicator */}
                {currentPage === page && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-light rounded-full"></div>
                )}
                
                {/* Hover effect */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 transform -translate-x-1/2 rounded-full group-hover:w-full"></div>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col p-2 rounded-md transition-colors duration-300 hover:bg-primary-lightest w-8 h-8 justify-center items-center"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={20} className="text-gray-800" /> : <FaBars size={20} className="text-gray-800" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`
          md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-400
          ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
        `}>
          <div className="py-4">
            {['home', 'about', 'sale', 'rental', 'temporal', 'contact'].map((page, index) => (
              <Link 
                key={page}
                to={`/${page === 'home' ? '' : page}`}
                className={`
                  block py-4 px-6 text-gray-700 no-underline text-base font-medium border-b border-gray-100 transition-all duration-300
                  hover:bg-gray-50 hover:text-primary-dark
                  ${currentPage === page ? 'text-primary-dark bg-primary-lightest font-semibold' : ''}
                  fade-in-right
                `}
                onClick={() => handleNavClick(page)}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                {page === 'home' && 'Inicio'}
                {page === 'about' && 'Nosotros'}
                {page === 'sale' && 'Venta'}
                {page === 'rental' && 'Alquiler'}
                {page === 'temporal' && 'Temporal'}
                {page === 'contact' && 'Contacto'}
                
                {currentPage === page && (
                  <div className="w-1/3 h-0.5 bg-gradient-to-r from-primary to-primary-light rounded-full mt-1 mx-auto"></div>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;