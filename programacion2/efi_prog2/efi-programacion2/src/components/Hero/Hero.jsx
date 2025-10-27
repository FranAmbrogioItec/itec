// Hero.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// --- (AÑADIDO) Importamos los iconos necesarios de react-icons ---
import { FaSearch, FaPhoneAlt } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ setCurrentPage, onSearch }) => {
  const heroRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    propertyType: '',
    location: '',
    operationType: ''
  });
  const navigate = useNavigate();


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.3 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Validar que al menos un filtro esté seleccionado
    const hasFilters = Object.values(searchFilters).some(value => value !== '');
    
    if (hasFilters && onSearch) {
      onSearch(searchFilters);
      
      // Redirigir a la página correspondiente según el tipo de operación
      if (searchFilters.operationType === 'venta') {
        navigate('/sale');
      } else if (searchFilters.operationType === 'alquiler') {
        navigate('/rental');
      } else if (searchFilters.operationType === 'temporal') {
        navigate('/temporal');
      } else {
        navigate('/sale');
      }
    } else if (onSearch) {
      // Si no hay filtros, mostrar todas las propiedades de venta
      onSearch({});
      navigate('/sale');
    }
  };

  const handleFilterChange = (filter, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const scrollToProperties = () => {
    navigate('/sale');
    setCurrentPage('sale');
  };

  const scrollToContact = () => {
    navigate('/contact');
    setCurrentPage('contact');
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <img 
          src="/hero.avif" 
          alt="Modern house in Río Cuarto" 
          className={`hero-bg-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && <div className="image-preloader"></div>}
      </div>
      
      <div className="container">
        <div className="hero-content">          
          <div className="hero-badge">
            <span>Inmobiliaria de confianza en Río Cuarto</span>
          </div>
          
          <h1 className="hero-title fade-in-up">
            Encuentra tu <span className="text-accent">hogar ideal</span> en Río Cuarto
          </h1>
          
          <p className="hero-subtitle fade-in-up">
            Descubre propiedades exclusivas en venta y alquiler con el mejor asesoramiento profesional.
          </p>
          
          {/* Search Filters */}
          <div className="search-filters fade-in-up">
            <form onSubmit={handleSearch} className="search-form">
              <div className="filter-group">
                <div className="select-wrapper">
                  <select 
                    value={searchFilters.propertyType} 
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  >
                    <option value="">Tipo de propiedad</option>
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="local">Local Comercial</option>
                    <option value="terreno">Terreno</option>
                  </select>
                </div>

                <div className="select-wrapper">
                  <select 
                    value={searchFilters.location} 
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  >
                    <option value="">Todas las zonas</option>
                    <option value="centro">Centro</option>
                    <option value="norte">Norte</option>
                    <option value="sur">Sur</option>
                    <option value="este">Este</option>
                    <option value="oeste">Oeste</option>
                  </select>
                </div>

                <div className="select-wrapper">
                  <select 
                    value={searchFilters.operationType} 
                    onChange={(e) => handleFilterChange('operationType', e.target.value)}
                  >
                    <option value="">Tipo de operación</option>
                    <option value="venta">Venta</option>
                    <option value="alquiler">Alquiler</option>
                    <option value="temporal">Alquiler Temporal</option>
                  </select>
                </div>
                
                <button type="submit" className="btn btn-primary search-btn">
                  {/* --- (MODIFICADO) Se reemplaza el emoji por el icono --- */}
                  <FaSearch className="btn-icon" />
                  Buscar
                </button>
              </div>
            </form>
          </div>

          <div className="hero-buttons fade-in-up">
            <button 
              className="btn btn-outline btn-large"
              onClick={scrollToProperties}
            >
              Ver todas las propiedades
            </button>
            
            <button 
              className="btn btn-primary btn-large"
              onClick={scrollToContact}
            >
              {/* --- (MODIFICADO) Se reemplaza el emoji por el icono --- */}
              <FaPhoneAlt className="btn-icon" />
              Contactar Ahora
            </button>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Desplázate</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;