import React, { useState, useEffect } from 'react';
import PropertyGrid from '../../components/PropertyGrid/PropertyGrid';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import { properties } from '../../data/properties';
import './Properties.css';

const TemporaryRental = () => {
  const [searchFilters, setSearchFilters] = useState({});
  const temporalProperties = properties.temporal;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <section id="temporal" className="properties-page temporal-page">
      <div className="container mx-auto px-4">
        <div className="page-header text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 mt-5">
            Alquiler Temporario
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Disfruta de estadías temporales en las mejores propiedades de Río Cuarto y la región
          </p>
        </div>
        
        <SearchFilters onSearch={handleSearch} propertyType="temporal" />
        <PropertyGrid properties={temporalProperties} searchFilters={searchFilters} />
      </div>
    </section>
  );
};

export default TemporaryRental;