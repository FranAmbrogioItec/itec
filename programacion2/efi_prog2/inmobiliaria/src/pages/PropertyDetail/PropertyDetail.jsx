import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { properties } from '../../data/properties';

// Importación de iconos
import { 
  FaBed, FaBath, FaRulerCombined, FaTag, FaWhatsapp, FaPhone, 
  FaEnvelope, FaMapMarkerAlt, FaCheck, FaArrowLeft,
  FaChevronLeft, FaChevronRight, FaTimes
} from 'react-icons/fa';
import { 
  HiHome, HiOutlineDocumentText, HiOutlineLocationMarker, 
  HiOutlineSparkles, HiOutlinePhone
} from 'react-icons/hi';
import './PropertyDetail.css';

const PropertyDetail = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const property = properties[type]?.find(prop => prop.id === parseInt(id));

  // Estados para la galería y el modal personalizado
  const [mainImage, setMainImage] = useState(property ? property.images[0] : null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (property) {
      setMainImage(property.images[0]);
    }
  }, [id, type, property]);

  // Función para formatear precios
  const formatPrice = (price) => {
    if (typeof price === 'string') {
      // Si ya es un string con formato (como "$ 18.000/mes"), lo dejamos igual
      return price;
    }
    
    // Si es un número, lo formateamos
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('ARS', '$');
  };

  if (!property) {
    return (
      <div className="property-not-found">
        <div className="container">
          <h2>Propiedad no encontrada</h2>
          <p>La propiedad que buscas no existe o ha sido removida.</p>
          <Link to="/" className="btn btn-accent">
            <HiHome className="btn-icon" />
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleThumbnailClick = (image, index) => {
    setMainImage(image);
  };

  const openModal = (index) => {
    setModalIndex(index);
    setModalOpen(true);
    // Bloquear scroll cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    // Restaurar scroll
    document.body.style.overflow = 'unset';
  };

  const goToNextImage = () => {
    if (modalIndex < property.images.length - 1) {
      setModalIndex(modalIndex + 1);
    }
  };

  const goToPrevImage = () => {
    if (modalIndex > 0) {
      setModalIndex(modalIndex - 1);
    }
  };

  const selectModalImage = (index) => {
    setModalIndex(index);
  };

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalOpen]);

  const whatsappMessage = `Hola, me interesa la propiedad: ${property.title} - ${property.location}. ¿Podrían proporcionarme más información?`;

  const handleWhatsAppClick = () => {
    const phoneNumber = "543581234567";
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className="property-detail-page">
        <div className="property-detail-header">
          <div className="container">
            <button onClick={() => navigate(-1)} className="back-button">
              <FaArrowLeft className="back-button-icon" />
              Volver
            </button>
            <h1>{property.title}</h1>
            <p className="property-location">
              <FaMapMarkerAlt className="location-icon" />
              {property.location}
            </p>
          </div>
        </div>

        <div className="property-detail-content container">
          {/* Columna Izquierda: Galería y Contacto */}
          <div className="property-detail-left">
            <div className="property-gallery">
              <div className="main-image" onClick={() => openModal(property.images.indexOf(mainImage))}>
                <img src={mainImage} alt={property.title} />
              </div>
              <div className="thumbnail-grid">
                {property.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${mainImage === image ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(image, index)}
                  >
                    <img src={image} alt={`${property.title} - Imagen ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="property-card property-contact">
              <h3>
                <HiOutlinePhone />
                ¿Te interesa esta propiedad?
              </h3>
              <p>Contacta con nosotros para más información o para agendar una visita.</p>
              <div className="contact-buttons">
                <button onClick={handleWhatsAppClick} className="btn btn-accent">
                  <FaWhatsapp className="btn-icon" />
                  WhatsApp
                </button>
                <a href="tel:+543581234567" className="btn btn-outline">
                  <FaPhone className="btn-icon" />
                  Llamar
                </a>
                <a href="mailto:info@echeniqueinmobiliaria.com" className="btn btn-outline">
                  <FaEnvelope className="btn-icon" />
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Información */}
          <div className="property-detail-right">
            <div className="property-card property-price-section">
              <div className="property-price">
                <h2>{formatPrice(property.price)}</h2>
                {property.originalPrice && (
                  <span className="original-price">{formatPrice(property.originalPrice)}</span>
                )}
              </div>
              <button onClick={handleWhatsAppClick} className="btn btn-accent whatsapp-btn">
                <FaWhatsapp className="btn-icon" />
                Consultar por WhatsApp
              </button>
            </div>

            <div className="property-card property-features">
              <div className="feature">
                <span className="feature-icon"><FaBed /></span>
                <span><b>{property.bedrooms}</b> habitaciones</span>
              </div>
              <div className="feature">
                <span className="feature-icon"><FaBath /></span>
                <span><b>{property.bathrooms}</b> baños</span>
              </div>
              <div className="feature">
                <span className="feature-icon"><FaRulerCombined /></span>
                <span><b>{property.area}</b> m²</span>
              </div>
              <div className="feature">
                <span className="feature-icon"><FaTag /></span>
                <span>{type === 'venta' ? 'Venta' : type === 'alquiler' ? 'Alquiler' : 'Alquiler Temporal'}</span>
              </div>
            </div>

            <div className="property-card property-description">
              <h3>
                <HiOutlineDocumentText />
                Descripción
              </h3>
              <p>{property.description}</p>
            </div>

            <div className="property-card property-address">
              <h3>
                <HiOutlineLocationMarker />
                Dirección
              </h3>
              <p>{property.address}</p>
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                <FaMapMarkerAlt className="map-link-icon" />
                Ver en Google Maps
              </a>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="property-card property-amenities">
                <h3>
                  <HiOutlineSparkles />
                  Características Adicionales
                </h3>
                <div className="amenities-grid">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <span className="amenity-icon"><FaCheck /></span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal personalizado para la galería */}
      <div className={`property-lightbox-modal ${modalOpen ? 'open' : ''}`}>
        <div className="lightbox-content">
          <div className="lightbox-header">
            <h3 className="lightbox-title">{property.title} - Imagen {modalIndex + 1} de {property.images.length}</h3>
            <button className="lightbox-close" onClick={closeModal}>
              <FaTimes />
            </button>
          </div>
          
          <div className="lightbox-body">
            <img 
              src={property.images[modalIndex]} 
              alt={`${property.title} - Imagen ${modalIndex + 1}`}
              className="lightbox-main-image"
            />
            
            <div className="lightbox-nav">
              <button 
                className="lightbox-nav-btn" 
                onClick={goToPrevImage}
                disabled={modalIndex === 0}
              >
                <FaChevronLeft />
              </button>
              <button 
                className="lightbox-nav-btn" 
                onClick={goToNextImage}
                disabled={modalIndex === property.images.length - 1}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
          
          <div className="lightbox-footer">
            <div className="lightbox-thumbnails">
              {property.images.map((image, index) => (
                <div 
                  key={index}
                  className={`lightbox-thumbnail ${modalIndex === index ? 'active' : ''}`}
                  onClick={() => selectModalImage(index)}
                >
                  <img src={image} alt={`Miniatura ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;