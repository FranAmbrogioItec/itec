import React, { useState, useEffect } from 'react';
import PropertyGrid from '../../components/PropertyGrid/PropertyGrid';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import { properties } from '../../data/properties';
import './Properties.css';

const Sale = () => {
  const [searchFilters, setSearchFilters] = useState({});
  const saleProperties = properties.venta;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <section id="sale" className="properties-page sale-page">
      <div className="container mx-auto px-4">
        <div className="page-header text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 mt-5">
            Propiedades en Venta
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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