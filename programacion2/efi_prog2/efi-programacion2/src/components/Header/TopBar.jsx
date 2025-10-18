// TopBar.jsx - Versión con todos los elementos alineados a la derecha
import React from 'react';
import { FaPhone, FaEnvelope, FaFacebookF, FaInstagram } from 'react-icons/fa';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-container">
        {/* Contenedor para agrupar todos los elementos y alinearlos a la derecha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Teléfono */}
          <a href="tel:+543581234567" className="social-link">
            <FaPhone className="social-icon" />
            <span>+54 358 4863 428</span>
          </a>

          {/* Email */}
          <a href="mailto:info@echeniqueinmobiliaria.com" className="social-link">
            <FaEnvelope className="social-icon" />
            <span>echeniqueinmobiliaria@gmail.com</span>
          </a>

          {/* Facebook */}
          <a 
            href="https://www.facebook.com/profile.php?id=61562956978577&ref=_xav_ig_profile_page_web#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            aria-label="Facebook"
          >
            <FaFacebookF className="social-icon" />
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/inmobiliaria_echenique/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            aria-label="Instagram"
          >
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;