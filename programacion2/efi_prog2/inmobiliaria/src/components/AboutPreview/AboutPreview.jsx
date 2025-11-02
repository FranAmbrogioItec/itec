import React from 'react';
import { Link } from 'react-router-dom';

const AboutPreview = ({ setCurrentPage }) => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Títulos */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-dark mb-2">
          Sobre Nosotros
        </h2>
        <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          Conoce más sobre Echenique Soluciones Inmobiliarias
        </p>
        
        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Texto y Estadísticas */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-primary-dark font-jakarta">
              Expertos en el mercado inmobiliario de Río Cuarto
            </h3>
            
            <div className="space-y-4">
              <p className="text-gray-500 leading-8">
                En Echenique Soluciones Inmobiliarias nos especializamos en brindar 
                asesoramiento profesional para la compra, venta y alquiler de propiedades 
                en Río Cuarto y la región.
              </p>
              <p className="text-gray-500 leading-8">
                Nuestro equipo de profesionales cuenta con amplia experiencia en el mercado 
                local, ofreciendo un servicio personalizado y de calidad para satisfacer 
                las necesidades de nuestros clientes.
              </p>
            </div>
            
            {/* Estadísticas */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 pt-6 pb-8">
              <div className="flex flex-col items-start sm:items-center text-center sm:text-left">
                <span className="text-4xl font-bold text-primary font-jakarta mb-2">
                  10+
                </span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">
                  Años de experiencia
                </span>
              </div>
              
              <div className="flex flex-col items-start sm:items-center text-center sm:text-left">
                <span className="text-4xl font-bold text-primary font-jakarta mb-2">
                  500+
                </span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">
                  Propiedades gestionadas
                </span>
              </div>
              
              <div className="flex flex-col items-start sm:items-center text-center sm:text-left">
                <span className="text-4xl font-bold text-primary font-jakarta mb-2">
                  98%
                </span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">
                  Clientes satisfechos
                </span>
              </div>
            </div>
            
            {/* Botón */}
            <Link 
              to="/about" 
              className="
                inline-block bg-accent text-white 
                px-8 py-4 rounded-lg font-semibold
                transition-all duration-300
                hover:bg-accent-dark hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                shadow-md hover:shadow-lg
              "
              onClick={() => setCurrentPage('about')}
            >
              Conocer más
            </Link>
          </div>
          
          {/* Imagen */}
          <div className="
            relative rounded-xl overflow-hidden
            shadow-2xl hover:shadow-3xl
            transition-all duration-500
            hover:scale-[1.02]
          ">
            <img 
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Oficina de Echenique Soluciones Inmobiliarias" 
              className="w-full h-full object-cover block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;