import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPreview.css';

const AboutPreview = ({ setCurrentPage }) => {
  return (
    <section className="about-preview section">
      <div className="container">
        <h2 className="section-title">Sobre Nosotros</h2>
        <p className="section-subtitle">
          Conoce más sobre Echenique Soluciones Inmobiliarias
        </p>
        
        <div className="about-preview-content">
          <div className="about-preview-text">
            <h3>Expertos en el mercado inmobiliario de Río Cuarto</h3>
            <p>
              En Echenique Soluciones Inmobiliarias nos especializamos en brindar 
              asesoramiento profesional para la compra, venta y alquiler de propiedades 
              en Río Cuarto y la región.
            </p>
            <p>
              Nuestro equipo de profesionales cuenta con amplia experiencia en el mercado 
              local, ofreciendo un servicio personalizado y de calidad para satisfacer 
              las necesidades de nuestros clientes.
            </p>
            
            <div className="about-preview-stats">
              <div className="about-preview-stat">
                <span className="about-preview-stat-number">10+</span>
                <span className="about-preview-stat-label">Años de experiencia</span>
              </div>
              <div className="about-preview-stat">
                <span className="about-preview-stat-number">500+</span>
                <span className="about-preview-stat-label">Propiedades gestionadas</span>
              </div>
              <div className="about-preview-stat">
                <span className="about-preview-stat-number">98%</span>
                <span className="about-preview-stat-label">Clientes satisfechos</span>
              </div>
            </div>
            
            <Link 
              to="/about" 
              className="btn btn-accent"
              onClick={() => setCurrentPage('about')}
            >
              Conocer más
            </Link>
          </div>
          
          <div className="about-preview-image">
            <img 
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Oficina de Echenique Soluciones Inmobiliarias" 
              className="about-preview-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;