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
      return price;
    }
    
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('ARS', '$');
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Propiedad no encontrada</h2>
          <p className="text-gray-600 mb-8">La propiedad que buscas no existe o ha sido removida.</p>
          <Link to="/" className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors duration-300">
            <HiHome className="text-xl" />
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
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
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
      <div className="bg-gray-50 pb-20">
        {/* Cabecera */}
        <div className="bg-gradient-to-br from-blue-50 to-gray-100 py-12 md:py-24 border-b border-gray-200 mb-8 md:mb-12 mt-6">
          <div className="container mx-auto px-4 relative">
            {/* Botón volver - Responsive */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-center">
              <button 
                onClick={() => navigate(-1)} 
                className="back-button-mobile md:absolute top-1/2 left-0 -translate-y-1/2 bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm hover:bg-gray-50 hover:text-gray-800 hover:shadow-md transition-all duration-300 w-fit mb-4 md:mb-0 mt-7"
              >
                <FaArrowLeft />
                Volver
              </button>
              <div className="text-center flex-1">
                <h1 className="title-responsive-mobile text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
                  {property.title}
                </h1>
                <p className="text-gray-600 flex items-center justify-center gap-2 text-base md:text-lg">
                  <FaMapMarkerAlt className="text-teal-600" />
                  {property.location}
                </p>
              </div>
              {/* Espacio vacío para balancear el layout en desktop */}
              <div className="hidden md:block w-32"></div>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
            
            {/* Columna Izquierda: Galería y Contacto */}
            <div className="space-y-6 sticky-top-24-mobile-fix lg:sticky lg:top-24">
              {/* Galería */}
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
                <div 
                  className="w-full aspect-w-4 aspect-h-3 rounded-lg md:rounded-xl overflow-hidden shadow-lg md:shadow-xl cursor-pointer mb-3 md:mb-4"
                  onClick={() => openModal(property.images.indexOf(mainImage))}
                >
                  <img 
                    src={mainImage} 
                    alt={property.title} 
                    className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                  />
                </div>
                
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 gallery-thumbnails-mobile">
                  {property.images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`aspect-square rounded-md md:rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                        mainImage === image 
                          ? 'border-teal-600 shadow-lg ring-2 ring-teal-100' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      onClick={() => handleThumbnailClick(image, index)}
                    >
                      <img 
                        src={image} 
                        alt={`${property.title} - Imagen ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Contacto */}
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                  <HiOutlinePhone className="text-teal-600" />
                  ¿Te interesa esta propiedad?
                </h3>
                <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                  Contacta con nosotros para más información o para agendar una visita.
                </p>
                <div className="space-y-2 md:space-y-3">
                  <button 
                    onClick={handleWhatsAppClick} 
                    className="w-full bg-gradient-to-r from-teal-700 to-teal-800 text-white py-3 px-4 rounded-lg md:rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:opacity-90 text-sm md:text-base"
                  >
                    <FaWhatsapp className="text-lg md:text-xl" />
                    WhatsApp
                  </button>
                  <a 
                    href="tel:+543581234567" 
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg md:rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 text-sm md:text-base"
                  >
                    <FaPhone className="text-lg md:text-xl" />
                    Llamar
                  </a>
                  <a 
                    href="mailto:info@echeniqueinmobiliaria.com" 
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg md:rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 text-sm md:text-base"
                  >
                    <FaEnvelope className="text-lg md:text-xl" />
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Información */}
            <div className="space-y-4 md:space-y-6">
              {/* Precio */}
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
                  <div className="text-center sm:text-left mb-3 sm:mb-0">
                    <h2 className="text-responsive-mobile text-2xl md:text-4xl font-bold text-gray-800">
                      {formatPrice(property.price)}
                    </h2>
                    {property.originalPrice && (
                      <span className="text-lg md:text-xl text-gray-500 line-through ml-2">
                        {formatPrice(property.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={handleWhatsAppClick} 
                    className="bg-gradient-to-r from-teal-700 to-teal-800 text-white px-4 py-3 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:opacity-90 whitespace-nowrap w-full sm:w-auto justify-center text-sm md:text-base"
                  >
                    <FaWhatsapp className="text-lg md:text-xl" />
                    Consultar por WhatsApp
                  </button>
                </div>
              </div>

              {/* Características principales */}
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaBed className="text-teal-600 text-lg md:text-xl" />
                    <span className="text-sm md:text-base"><b>{property.bedrooms}</b> habitaciones</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaBath className="text-teal-600 text-lg md:text-xl" />
                    <span className="text-sm md:text-base"><b>{property.bathrooms}</b> baños</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaRulerCombined className="text-teal-600 text-lg md:text-xl" />
                    <span className="text-sm md:text-base"><b>{property.area}</b> m²</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaTag className="text-teal-600 text-lg md:text-xl" />
                    <span className="text-sm md:text-base">{type === 'venta' ? 'Venta' : type === 'alquiler' ? 'Alquiler' : 'Alquiler Temporal'}</span>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                  <HiOutlineDocumentText className="text-teal-600" />
                  Descripción
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{property.description}</p>
              </div>

              {/* Dirección */}
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                  <HiOutlineLocationMarker className="text-teal-600" />
                  Dirección
                </h3>
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">{property.address}</p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-2 transition-colors duration-200 hover:underline text-sm md:text-base"
                >
                  <FaMapMarkerAlt />
                  Ver en Google Maps
                </a>
              </div>

              {/* Características adicionales */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
                    <HiOutlineSparkles className="text-teal-600" />
                    Características Adicionales
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                        <FaCheck className="text-teal-600 text-sm" />
                        <span className="text-gray-700 text-sm md:text-base">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal personalizado para la galería */}
      <div 
        className={`fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${
          modalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeModal}
      >
        <div 
          className="bg-white rounded-xl md:rounded-2xl overflow-hidden w-full max-w-6xl max-h-[90vh] mx-4 flex flex-col shadow-2xl transform transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
          style={{ transform: modalOpen ? 'scale(1)' : 'scale(0.95)' }}
        >
          {/* Header del modal */}
          <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">
              {property.title} - Imagen {modalIndex + 1} de {property.images.length}
            </h3>
            <button 
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
              onClick={closeModal}
            >
              <FaTimes className="text-lg md:text-xl" />
            </button>
          </div>
          
          {/* Cuerpo del modal */}
          <div className="relative flex-1 flex items-center justify-center p-4 md:p-8">
            <img 
              src={property.images[modalIndex]} 
              alt={`${property.title} - Imagen ${modalIndex + 1}`}
              className="max-w-full max-h-[60vh] md:max-h-[65vh] object-contain rounded-lg"
            />
            
            {/* Navegación */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2 md:px-4 -translate-y-1/2 pointer-events-none">
              <button 
                className="bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg pointer-events-auto transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={goToPrevImage}
                disabled={modalIndex === 0}
              >
                <FaChevronLeft className="text-lg md:text-xl" />
              </button>
              <button 
                className="bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg pointer-events-auto transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={goToNextImage}
                disabled={modalIndex === property.images.length - 1}
              >
                <FaChevronRight className="text-lg md:text-xl" />
              </button>
            </div>
          </div>
          
          {/* Miniaturas */}
          <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex gap-2 overflow-x-auto py-2 lightbox-thumbnails">
              {property.images.map((image, index) => (
                <div 
                  key={index}
                  className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-md md:rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                    modalIndex === index 
                      ? 'border-teal-600 opacity-100' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => selectModalImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
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