import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaMapMarkerAlt,
  FaHeart,
  FaEye
} from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const formatPrice = (price, type) => {
    if (typeof price === 'string') return price;
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
    
    if (type === 'alquiler') return `${formattedPrice}/mes`;
    return formattedPrice;
  };

  const getBadgeText = (type) => {
    switch (type) {
      case 'venta': return 'En Venta';
      case 'alquiler': return 'En Alquiler';
      case 'temporal': return 'Temporal';
      default: return type;
    }
  };

  const mainImage = property.images?.[0] || '/placeholder-image.jpg';

  return (
    <div className="
      bg-white rounded-2xl overflow-hidden shadow-lg
      border border-primary/10 transition-all duration-300
      hover:-translate-y-2 hover:shadow-2xl
      flex flex-col h-full
    ">
      <Link 
        to={`/property/${property.type}/${property.id}`}
        className="flex flex-col h-full no-underline text-inherit"
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={mainImage} 
            alt={property.title}
            className="
              w-full h-full object-cover
              transition-transform duration-400 ease-out
              group-hover:scale-105
            "
          />
          
          {/* Badge */}
          <div className="
            absolute top-4 left-4 bg-primary text-white
            px-3 py-2 rounded-lg text-sm font-semibold
            tracking-wide capitalize z-10
          ">
            {getBadgeText(property.type)}
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button 
              className="
                w-9 h-9 bg-white/90 backdrop-blur-sm
                border border-black/5 rounded-full
                flex items-center justify-center text-primary
                transition-all duration-200
                hover:bg-primary hover:text-white hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-white/50
              "
              onClick={(e) => {
                e.preventDefault(); 
                console.log('Favorito clickeado');
              }}
              aria-label="Añadir a favoritos"
            >
              <FaHeart className="text-sm" />
            </button>
            <button 
              className="
                w-9 h-9 bg-white/90 backdrop-blur-sm
                border border-black/5 rounded-full
                flex items-center justify-center text-primary
                transition-all duration-200
                hover:bg-primary hover:text-white hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-white/50
              "
              onClick={(e) => {
                e.preventDefault(); 
                console.log('Vista rápida clickeado');
              }}
              aria-label="Vista rápida"
            >
              <FaEye className="text-sm" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Price */}
          <div className="
            text-2xl font-bold text-primary-dark mb-2
            font-jakarta
          ">
            {formatPrice(property.price, property.type)}
          </div>
          
          {/* Title */}
          <h3 className="
            text-lg font-semibold text-gray-900 mb-3 leading-tight
            line-clamp-2 min-h-[3rem]
          ">
            {property.title}
          </h3>
          
          {/* Location */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <FaMapMarkerAlt className="text-primary text-base" />
            <span>{property.location}</span>
          </div>

          {/* Features */}
          <div className="
            flex justify-around items-center my-4 py-4
            border-t border-b border-gray-200
            gap-4
          ">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaBed className="text-primary text-lg" />
              <span>{property.bedrooms || 0} hab.</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaBath className="text-primary text-lg" />
              <span>{property.bathrooms || 0} baños</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaRulerCombined className="text-primary text-lg" />
              <span>{property.area || 0} m²</span>
            </div>
          </div>
          
          {/* Button Container */}
          <div className="mt-auto pt-4">
            <div className="
              block text-center bg-transparent text-primary
              px-6 py-3 border-2 border-primary-light rounded-lg
              font-semibold transition-all duration-300
              hover:bg-primary hover:border-primary hover:text-white
              hover:-translate-y-0.5 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-primary/30
            ">
              Ver detalles
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;