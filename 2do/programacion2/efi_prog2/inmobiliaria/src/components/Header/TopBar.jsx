// TopBar.jsx - Versión migrada a Tailwind CSS
import React from 'react';
import { FaPhone, FaEnvelope, FaFacebookF, FaInstagram } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="
      bg-gradient-to-r from-primary-dark to-primary
      text-white text-xs
      py-1 relative z-50
      animate-slideDown
      hidden md:block
    ">
      <div className="max-w-7xl mx-auto px-6 flex justify-end">
        <div className="flex items-center gap-6">
          {/* Teléfono */}
          <a 
            href="tel:+543584863428" 
            className="
              flex items-center gap-2
              text-white text-opacity-90 no-underline
              transition-all duration-300
              hover:text-white hover:scale-105
              group
            "
          >
            <FaPhone className="text-sm transition-transform duration-300 group-hover:scale-110" />
            <span className="font-medium">+54 358 4863 428</span>
          </a>

          {/* Email */}
          <a 
            href="mailto:echeniqueinmobiliaria@gmail.com" 
            className="
              flex items-center gap-2
              text-white text-opacity-90 no-underline
              transition-all duration-300
              hover:text-white hover:scale-105
              group
            "
          >
            <FaEnvelope className="text-sm transition-transform duration-300 group-hover:scale-110" />
            <span className="font-medium">echeniqueinmobiliaria@gmail.com</span>
          </a>

          {/* Facebook */}
          <a 
            href="https://www.facebook.com/profile.php?id=61562956978577&ref=_xav_ig_profile_page_web#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="
              flex items-center
              text-white text-opacity-80 no-underline
              transition-all duration-300
              hover:text-white hover:scale-110
              group
            "
            aria-label="Facebook"
          >
            <FaFacebookF className="text-sm transition-transform duration-300 group-hover:scale-125" />
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/inmobiliaria_echenique/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="
              flex items-center
              text-white text-opacity-80 no-underline
              transition-all duration-300
              hover:text-white hover:scale-110
              group
            "
            aria-label="Instagram"
          >
            <FaInstagram className="text-sm transition-transform duration-300 group-hover:scale-125" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;