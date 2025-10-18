// Hero.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPhoneAlt } from 'react-icons/fa';
// Eliminamos la importación del CSS: import './Hero.css';

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
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden pt-20"
      ref={heroRef}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/80 to-primary/60 z-10"></div>
        <img 
          src="/hero.avif" 
          alt="Modern house in Río Cuarto" 
          className={`w-full h-full object-cover absolute inset-0 transition-all duration-1000 ease-out ${
            imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-primary"></div>
        )}
      </div>
      
      {/* Content */}
      <div className="container max-w-[1200px] mx-auto px-5">
        <div className="text-center text-white max-w-[800px] mx-auto px-5 relative z-30">
          {/* Badge */}
          <div className="mb-5 animate-fadeInUp">
            <span className="inline-block bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20 tracking-wide">
              Inmobiliaria de confianza en Río Cuarto
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight font-jakarta text-shadow-lg animate-fadeInUp animation-delay-200">
            Encuentra tu <span className="bg-gradient-to-br from-orange-500 to-accent-light bg-clip-text text-transparent">hogar ideal</span> en Río Cuarto
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90 text-shadow animate-fadeInUp animation-delay-400">
            Descubre propiedades exclusivas en venta y alquiler con el mejor asesoramiento profesional.
          </p>
          
          {/* Search Filters */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 my-8 border border-white/20 animate-fadeInUp animation-delay-600">
            <form onSubmit={handleSearch} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Property Type */}
                <div className="relative w-full">
                  <select 
                    value={searchFilters.propertyType} 
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    className="w-full p-4 border-none rounded-lg bg-white text-neutral-900 font-inter text-base shadow-sm appearance-none cursor-pointer transition-all focus:outline-none focus:ring-4 focus:ring-white/30 focus:shadow-md"
                  >
                    <option value="">Tipo de propiedad</option>
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="local">Local Comercial</option>
                    <option value="terreno">Terreno</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-900 pointer-events-none z-10">▼</div>
                </div>

                {/* Location */}
                <div className="relative w-full">
                  <select 
                    value={searchFilters.location} 
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full p-4 border-none rounded-lg bg-white text-neutral-900 font-inter text-base shadow-sm appearance-none cursor-pointer transition-all focus:outline-none focus:ring-4 focus:ring-white/30 focus:shadow-md"
                  >
                    <option value="">Todas las zonas</option>
                    <option value="centro">Centro</option>
                    <option value="norte">Norte</option>
                    <option value="sur">Sur</option>
                    <option value="este">Este</option>
                    <option value="oeste">Oeste</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-900 pointer-events-none z-10">▼</div>
                </div>

                {/* Operation Type */}
                <div className="relative w-full">
                  <select 
                    value={searchFilters.operationType} 
                    onChange={(e) => handleFilterChange('operationType', e.target.value)}
                    className="w-full p-4 border-none rounded-lg bg-white text-neutral-900 font-inter text-base shadow-sm appearance-none cursor-pointer transition-all focus:outline-none focus:ring-4 focus:ring-white/30 focus:shadow-md"
                  >
                    <option value="">Tipo de operación</option>
                    <option value="venta">Venta</option>
                    <option value="alquiler">Alquiler</option>
                    <option value="temporal">Alquiler Temporal</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-900 pointer-events-none z-10">▼</div>
                </div>
                
                {/* Search Button */}
                <button 
                  type="submit" 
                  className="col-span-1 md:col-span-3 mt-4 bg-accent text-white px-6 py-4 rounded-lg font-semibold text-lg shadow-md hover:bg-accent-light hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaSearch className="text-xl" />
                  Buscar
                </button>
              </div>
            </form>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-fadeInUp animation-delay-800">
            <button 
              className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 hover:-translate-y-1 transform transition-all duration-300"
              onClick={scrollToProperties}
            >
              Ver todas las propiedades
            </button>
            
            <button 
              className="bg-accent text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:bg-accent-light hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={scrollToContact}
            >
              <FaPhoneAlt className="text-xl" />
              Contactar Ahora
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (comentado) */}
      {/* <div className="scroll-indicator">
        <span>Desplázate</span>
        <div className="scroll-line"></div>
      </div> */}
    </section>
  );
};

export default Hero;