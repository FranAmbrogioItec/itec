import React, { useState } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';

const PropertyGrid = ({ properties, searchFilters }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // Aplicar filtros de búsqueda
  React.useEffect(() => {
    let result = properties;
    
    if (searchFilters.propertyType) {
      result = result.filter(prop => 
        prop.title.toLowerCase().includes(searchFilters.propertyType.toLowerCase()) ||
        prop.type.toLowerCase() === searchFilters.propertyType.toLowerCase()
      );
    }
    
    if (searchFilters.location) {
      result = result.filter(prop => 
        prop.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }
    
    if (searchFilters.bedrooms) {
      result = result.filter(prop => 
        prop.bedrooms >= parseInt(searchFilters.bedrooms)
      );
    }
    
    if (searchFilters.bathrooms) {
      result = result.filter(prop => 
        prop.bathrooms >= parseInt(searchFilters.bathrooms)
      );
    }
    
    if (searchFilters.minPrice) {
      result = result.filter(prop => {
        const price = parseFloat(prop.price.replace(/[^0-9.]/g, ''));
        return price >= parseInt(searchFilters.minPrice);
      });
    }
    
    if (searchFilters.maxPrice) {
      result = result.filter(prop => {
        const price = parseFloat(prop.price.replace(/[^0-9.]/g, ''));
        return price <= parseInt(searchFilters.maxPrice);
      });
    }
    
    if (searchFilters.minArea) {
      result = result.filter(prop => 
        prop.area >= parseInt(searchFilters.minArea)
      );
    }
    
    if (searchFilters.maxArea) {
      result = result.filter(prop => 
        prop.area <= parseInt(searchFilters.maxArea)
      );
    }
    
    setFilteredProperties(result);
  }, [searchFilters, properties]);

  return (
    <div className="w-full">
      <div className="
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        gap-8
      ">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))
        ) : (
          <div className="
            col-span-full text-center py-12 px-6
            text-gray-500
          ">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              No se encontraron propiedades
            </h3>
            <p className="text-lg">
              Intenta con otros criterios de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyGrid;