import React from 'react';
import { 
  FaHome, 
  FaKey, 
  FaUmbrellaBeach, 
  FaClipboardList, 
  FaBalanceScale, 
  FaChartLine 
} from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: <FaHome />,
      title: 'Venta de Propiedades',
      description: 'Asesoramiento profesional para la compra y venta de propiedades, con amplia cartera de opciones en Río Cuarto y la región.'
    },
    {
      icon: <FaKey />,
      title: 'Alquileres',
      description: 'Gestión completa de alquileres residenciales y comerciales, con contratos seguros y seguimiento personalizado.'
    },
    {
      icon: <FaUmbrellaBeach />,
      title: 'Alquiler Temporario',
      description: 'Propiedades para vacaciones y estadías temporales, con todas las comodidades para disfrutar de tu tiempo libre.'
    },
    {
      icon: <FaClipboardList />,
      title: 'Tasaciones',
      description: 'Valoraciones profesionales de propiedades con metodologías actualizadas y conocimiento del mercado local.'
    },
    {
      icon: <FaBalanceScale />,
      title: 'Asesoramiento Legal',
      description: 'Asesoramiento integral en todos los aspectos legales de las operaciones inmobiliarias.'
    },
    {
      icon: <FaChartLine />,
      title: 'Marketing Inmobiliario',
      description: 'Estrategias de marketing digital y tradicional para maximizar la exposición de tu propiedad.'
    }
  ];

  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="services-header">
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">
            Soluciones integrales para todas tus necesidades inmobiliarias
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon-container">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;