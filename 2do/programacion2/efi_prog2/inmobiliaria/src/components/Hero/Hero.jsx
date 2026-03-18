// Hero.jsx - Versión migrada a Tailwind CSS
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPhoneAlt } from 'react-icons/fa';

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
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
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
    
    const hasFilters = Object.values(searchFilters).some(value => value !== '');
    
    if (hasFilters && onSearch) {
      onSearch(searchFilters);
      
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
    <section 
      id="home" 
      ref={heroRef}
      className="
        relative h-screen min-h-[700px] flex items-center justify-center 
        overflow-hidden pt-20
        opacity-0 translate-y-8 transition-all duration-700
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="
          absolute inset-0 z-10
          bg-gradient-to-br from-primary-dark/80 to-primary/60
        "></div>
        <img 
          src="/hero.avif" 
          alt="Modern house in Río Cuarto" 
          className={`
            w-full h-full object-cover absolute inset-0
            transition-all duration-1000 ease-out
            ${imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}
          `}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="
            absolute inset-0 bg-gradient-to-br from-primary-dark to-primary
          "></div>
        )}
      </div>
      
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center text-white max-w-4xl mx-auto relative z-20">
          {/* Badge */}
          <div className="
            mb-8 animate-fade-in-down
          ">
            <span className="
            hidden 
  
            // ⚠️ MOSTRAR a partir de tablet/escritorio (breakpoint md)
              md:inline-block bg-white/15 backdrop-blur-lg
              px-6 py-3 rounded-full text-sm font-medium
              border border-white/20 tracking-wide
            ">
              Inmobiliaria de confianza en Río Cuarto
            </span>
          </div>
          
          {/* Title */}
          <h1 className="
            text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight
            font-jakarta text-shadow-lg
            animate-fade-in-up
          ">
            Encuentra tu{' '}
            <span className="
              bg-gradient-to-r from-orange-500 to-orange-400
              bg-clip-text text-transparent
            ">
              hogar ideal
            </span>{' '}
            en Río Cuarto
          </h1>
          
          {/* Subtitle */}
          <p className="
            text-xl md:text-2xl mb-12 leading-relaxed opacity-90 text-shadow
            animate-fade-in-up animation-delay-200
          ">
            Descubre propiedades exclusivas en venta y alquiler con el mejor asesoramiento profesional.
          </p>
          
          {/* Search Filters */}
          <div className="
            bg-white/15 backdrop-blur-lg rounded-2xl p-8 mb-12
            border border-white/20
            animate-fade-in-up animation-delay-400
          ">
            <form onSubmit={handleSearch} className="w-full">
              <div className="
                grid grid-cols-1 md:grid-cols-4 gap-4 items-end
              ">
                {/* Property Type */}
                <div className="relative">
                  <select 
                    value={searchFilters.propertyType} 
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    className="
                      w-full p-4 rounded-xl border-none
                      bg-white text-gray-800 font-medium
                      shadow-lg focus:ring-3 focus:ring-white/30
                      focus:outline-none appearance-none
                      cursor-pointer
                    "
                  >
                    <option value="">Tipo de propiedad</option>
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="local">Local Comercial</option>
                    <option value="terreno">Terreno</option>
                  </select>
                  <div className="
                    absolute right-4 top-1/2 transform -translate-y-1/2
                    text-gray-600 pointer-events-none
                  ">
                    ▼
                  </div>
                </div>

                {/* Location */}
                <div className="relative">
                  <select 
                    value={searchFilters.location} 
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="
                      w-full p-4 rounded-xl border-none
                      bg-white text-gray-800 font-medium
                      shadow-lg focus:ring-3 focus:ring-white/30
                      focus:outline-none appearance-none
                      cursor-pointer
                    "
                  >
                    <option value="">Todas las zonas</option>
                    <option value="centro">Centro</option>
                    <option value="norte">Norte</option>
                    <option value="sur">Sur</option>
                    <option value="este">Este</option>
                    <option value="oeste">Oeste</option>
                  </select>
                  <div className="
                    absolute right-4 top-1/2 transform -translate-y-1/2
                    text-gray-600 pointer-events-none
                  ">
                    ▼
                  </div>
                </div>

                {/* Operation Type */}
                <div className="relative">
                  <select 
                    value={searchFilters.operationType} 
                    onChange={(e) => handleFilterChange('operationType', e.target.value)}
                    className="
                      w-full p-4 rounded-xl border-none
                      bg-white text-gray-800 font-medium
                      shadow-lg focus:ring-3 focus:ring-white/30
                      focus:outline-none appearance-none
                      cursor-pointer
                    "
                  >
                    <option value="">Tipo de operación</option>
                    <option value="venta">Venta</option>
                    <option value="alquiler">Alquiler</option>
                    <option value="temporal">Alquiler Temporal</option>
                  </select>
                  <div className="
                    absolute right-4 top-1/2 transform -translate-y-1/2
                    text-gray-600 pointer-events-none
                  ">
                    ▼
                  </div>
                </div>
                
                {/* Search Button */}
                <button 
                  type="submit" 
                  className="
                    bg-accent text-white p-4 rounded-xl font-semibold
                    shadow-lg hover:bg-accent-dark hover:scale-105
                    transition-all duration-300 flex items-center justify-center gap-3
                    focus:outline-none focus:ring-3 focus:ring-white/30
                  "
                >
                  <FaSearch className="text-lg" />
                  Buscar
                </button>
              </div>
            </form>
          </div>

{/* Action Buttons */}
<div className="
  flex justify-center items-center gap-6
  animate-fade-in-up animation-delay-600 
">
  <button 
    className="
      bg-transparent text-white border-2 border-white/30
      backdrop-blur-lg px-8 py-4 rounded-xl font-semibold
      hover:bg-white/10 hover:border-white/50 hover:scale-105
      transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-white/30
      flex items-center justify-center min-h-[60px] flex-1 sm:w-auto mb-12
    "
    onClick={scrollToProperties}
  >
    Ver todas las propiedades
  </button>
  
  <button 
    className="
      bg-accent text-white px-8 py-4 rounded-xl font-semibold
      shadow-lg hover:bg-accent-dark hover:scale-105
      transition-all duration-300 flex items-center justify-center gap-3
      focus:outline-none focus:ring-3 focus:ring-white/30
      min-h-[60px] flex-1 sm:w-auto mb-12
    "
    onClick={scrollToContact}
  >
    <FaPhoneAlt className="text-lg" />
    Contactar Ahora
  </button>
</div>
        </div>
      </div>

      {/* Scroll Indicator */}
{/*       <div className="
        absolute bottom-10 left-1/2 transform -translate-x-1/2
        text-white flex flex-col items-center gap-2 opacity-70
        animate-bounce
      ">
        <span className="text-sm">Desplázate</span>
        <div className="
          w-0.5 h-10 bg-gradient-to-b from-transparent via-white to-transparent
          rounded-full
        "></div>
      </div> */}
    </section>
  );
};

export default Hero;