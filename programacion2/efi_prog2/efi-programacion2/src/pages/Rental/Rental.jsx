// Rental.jsx
import React, { useState, useEffect } from 'react';
import PropertyGrid from '../../components/PropertyGrid/PropertyGrid';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import { properties } from '../../data/properties';
import './Rental.css';

const Rental = () => {
  const [searchFilters, setSearchFilters] = useState({});
  const rentalProperties = properties.alquiler;

  // Scroll al tope cuando el componente se monta - CORREGIDO
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <section id="rental" className="rental-page section">
      <div className="container">
        <div className="page-header">
          <h2 className="section-title">Propiedades en Alquiler</h2>
          <p className="section-subtitle">
            Encuentra tu próximo hogar en alquiler en Río Cuarto y la región
          </p>
        </div>
        
        <SearchFilters onSearch={handleSearch} propertyType="alquiler" />
        <PropertyGrid properties={rentalProperties} searchFilters={searchFilters} />
      </div>
    </section>
  );
};

export default Rental;