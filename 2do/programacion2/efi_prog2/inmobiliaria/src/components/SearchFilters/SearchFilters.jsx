// SearchFilters.jsx - Versión migrada a Tailwind CSS
import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchFilters = ({ onSearch, propertyType }) => {
  const [filters, setFilters] = useState({
    operationType: '',
    propertyType: '',
    bedrooms: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters);
    }
  };

  const handleReset = () => {
    setFilters({
      operationType: '',
      propertyType: '',
      bedrooms: '',
      location: ''
    });
    if (onSearch) {
      onSearch({});
    }
  };

  return (
    <div className="
      bg-white p-10 rounded-2xl shadow-xl
      border border-gray-200 mb-12
      animate-slide-up
    ">
      {/* Header */}
      <div className="text-center mb-10">
        <h3 className="
          text-2xl font-bold text-primary-dark mb-3
          font-jakarta tracking-tight
        ">
          Encuentra tu propiedad ideal
        </h3>
        <p className="text-gray-500 text-lg font-normal">
          Filtra por tus preferencias principales
        </p>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
          gap-5 mb-8
        ">
          {/* Operation Type */}
          <div className="relative">
            <select 
              name="operationType" 
              value={filters.operationType}
              onChange={handleInputChange}
              className="
                w-full p-4 pr-12 border-2 border-gray-300
                rounded-xl bg-white text-gray-800 font-medium
                appearance-none cursor-pointer
                transition-all duration-300
                hover:border-primary focus:border-primary-light
                focus:ring-3 focus:ring-primary/15 focus:outline-none
                h-14
              "
            >
              <option value="">Tipo de operación</option>
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
              <option value="temporal">Alquiler temporal</option>
            </select>
            <div className="
              absolute right-4 top-1/2 transform -translate-y-1/2
              pointer-events-none
            ">
              <div className="
                w-0 h-0 border-l-2 border-l-transparent
                border-r-2 border-r-transparent border-t-3 border-t-gray-500
              "></div>
            </div>
          </div>

          {/* Property Type */}
          <div className="relative">
            <select 
              name="propertyType" 
              value={filters.propertyType}
              onChange={handleInputChange}
              className="
                w-full p-4 pr-12 border-2 border-gray-300
                rounded-xl bg-white text-gray-800 font-medium
                appearance-none cursor-pointer
                transition-all duration-300
                hover:border-primary focus:border-primary-light
                focus:ring-3 focus:ring-primary/15 focus:outline-none
                h-14
              "
            >
              <option value="">Tipo de propiedad</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="local">Local comercial</option>
              <option value="terreno">Terreno</option>
              <option value="oficina">Oficina</option>
            </select>
            <div className="
              absolute right-4 top-1/2 transform -translate-y-1/2
              pointer-events-none
            ">
              <div className="
                w-0 h-0 border-l-2 border-l-transparent
                border-r-2 border-r-transparent border-t-3 border-t-gray-500
              "></div>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="relative">
            <select 
              name="bedrooms" 
              value={filters.bedrooms}
              onChange={handleInputChange}
              className="
                w-full p-4 pr-12 border-2 border-gray-300
                rounded-xl bg-white text-gray-800 font-medium
                appearance-none cursor-pointer
                transition-all duration-300
                hover:border-primary focus:border-primary-light
                focus:ring-3 focus:ring-primary/15 focus:outline-none
                h-14
              "
            >
              <option value="">Cantidad de dormitorios</option>
              <option value="1">1 dormitorio</option>
              <option value="2">2 dormitorios</option>
              <option value="3">3 dormitorios</option>
              <option value="4">4+ dormitorios</option>
            </select>
            <div className="
              absolute right-4 top-1/2 transform -translate-y-1/2
              pointer-events-none
            ">
              <div className="
                w-0 h-0 border-l-2 border-l-transparent
                border-r-2 border-r-transparent border-t-3 border-t-gray-500
              "></div>
            </div>
          </div>

          {/* Location */}
          <div className="relative">
            <select 
              name="location" 
              value={filters.location}
              onChange={handleInputChange}
              className="
                w-full p-4 pr-12 border-2 border-gray-300
                rounded-xl bg-white text-gray-800 font-medium
                appearance-none cursor-pointer
                transition-all duration-300
                hover:border-primary focus:border-primary-light
                focus:ring-3 focus:ring-primary/15 focus:outline-none
                h-14
              "
            >
              <option value="">Zona/Ubicación</option>
              <option value="centro">Centro</option>
              <option value="norte">Norte</option>
              <option value="sur">Sur</option>
              <option value="este">Este</option>
              <option value="oeste">Oeste</option>
              <option value="noroeste">Noroeste</option>
              <option value="sureste">Sureste</option>
            </select>
            <div className="
              absolute right-4 top-1/2 transform -translate-y-1/2
              pointer-events-none
            ">
              <div className="
                w-0 h-0 border-l-2 border-l-transparent
                border-r-2 border-r-transparent border-t-3 border-t-gray-500
              "></div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="
          flex flex-col sm:flex-row gap-4 justify-center
          items-center
        ">
          <button 
            type="submit" 
            className="
              bg-gradient-to-r from-primary to-primary-light
              text-white px-8 py-4 rounded-xl font-semibold
              transition-all duration-300 flex items-center gap-3
              hover:shadow-lg hover:-translate-y-1 hover:brightness-110
              focus:outline-none focus:ring-3 focus:ring-primary/30
              min-w-[200px] justify-center
            "
          >
            <FaSearch className="text-base" />
            Buscar propiedades
          </button>
          <button 
            type="button" 
            className="
              bg-transparent text-gray-500 px-8 py-4 rounded-xl font-semibold
              border-2 border-gray-300 transition-all duration-300
              flex items-center gap-3 hover:bg-gray-50 hover:text-gray-700
              hover:border-primary hover:-translate-y-1
              focus:outline-none focus:ring-3 focus:ring-primary/15
              min-w-[200px] justify-center
            "
            onClick={handleReset}
          >
            <FaTimes className="text-base" />
            Limpiar filtros
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;