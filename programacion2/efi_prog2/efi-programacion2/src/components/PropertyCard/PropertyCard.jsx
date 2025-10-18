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
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const formatPrice = (price, type) => {
    if (typeof price === 'string') return price;
    
    // Asumimos USD para un formato más estándar, puedes cambiarlo a ARS si lo necesitas
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
    <div className="property-card">
      <Link 
        to={`/property/${property.type}/${property.id}`}
        className="property-card-link"
      >
        <div className="property-image-container">
          <img 
            src={mainImage} 
            alt={property.title}
            className="property-image"
          />
          <div className="property-badge">
            {getBadgeText(property.type)}
          </div>
          <div className="property-actions">
            <button 
              className="property-action-btn"
              onClick={(e) => {
                e.preventDefault(); 
                // Aquí iría la lógica para "Favoritos"
                console.log('Favorito clickeado');
              }}
              aria-label="Añadir a favoritos"
            >
              <FaHeart />
            </button>
            <button 
              className="property-action-btn"
              onClick={(e) => {
                e.preventDefault(); 
                // Aquí iría la lógica para "Vista rápida"
                console.log('Vista rápida clickeado');
              }}
              aria-label="Vista rápida"
            >
              <FaEye />
            </button>
          </div>
        </div>

        <div className="property-content">
          <div className="property-price">
            {formatPrice(property.price, property.type)}
          </div>
          
          <h3 className="property-title">{property.title}</h3>
          
          <div className="property-location">
            <FaMapMarkerAlt className="location-icon" />
            <span>{property.location}</span>
          </div>

          <div className="property-features">
            <div className="feature">
              <FaBed className="feature-icon" />
              <span>{property.bedrooms || 0} hab.</span>
            </div>
            <div className="feature">
              <FaBath className="feature-icon" />
              <span>{property.bathrooms || 0} baños</span>
            </div>
            <div className="feature">
              <FaRulerCombined className="feature-icon" />
              <span>{property.area || 0} m²</span>
            </div>
          </div>
          
          {/* Contenedor añadido para empujar el botón hacia abajo */}
          <div className="property-link-wrapper">
            <div className="property-link">
              Ver detalles
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;