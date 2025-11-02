// Sale.jsx
import React, { useState, useEffect } from 'react';
import PropertyGrid from '../../components/PropertyGrid/PropertyGrid';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import { properties } from '../../data/properties';
import './Sale.css';

const Sale = () => {
  const [searchFilters, setSearchFilters] = useState({});
  const saleProperties = properties.venta;

  // Scroll al tope cuando el componente se monta
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <section id="sale" className="sale-page section">
      <div className="container">
        <div className="page-header">
          <h2 className="section-title">Propiedades en Venta</h2>
          <p className="section-subtitle">
            Encuentra la propiedad perfecta para ti en Río Cuarto y la región
          </p>
        </div>
        
        <SearchFilters onSearch={handleSearch} propertyType="venta" />
        <PropertyGrid properties={saleProperties} searchFilters={searchFilters} />
      </div>
    </section>
  );
};

export default Sale;