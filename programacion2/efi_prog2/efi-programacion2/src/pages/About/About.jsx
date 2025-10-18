import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  FaMedal, 
  FaLightbulb, 
  FaHandshake, 
  FaChartLine,
  FaQuoteLeft
} from 'react-icons/fa';
import './About.css';

const About = () => {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: teamRef, inView: teamInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Scroll al tope cuando el componente se monta
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const team = [
    {
      name: 'Miguel Angel Echenique',
      role: 'Fundador',
      image: '/miguel.png',
      description: 'Más de 15 años de experiencia en el mercado inmobiliario local.'
    },
    {
      name: 'Juan Manuel Echenique',
      role: 'Encargado de Ventas',
      image: '/tato.png',
      description: 'Especialista en propiedades residenciales y atención personalizada.'
    },
/*     {
      name: 'Carlos Rodríguez',
      role: 'Gerente de Operaciones',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      description: 'Encargado de la gestión y coordinación de todas las operaciones.'
    } */
  ];

  const stats = [
    { number: '500+', label: 'Propiedades vendidas' },
    { number: '12+', label: 'Años de experiencia' },
    { number: '98%', label: 'Clientes satisfechos' },
    { number: '300+', label: 'Familias asesoradas' }
  ];

  return (
    <section id="about" className="about-page section">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className={`section-header ${headerInView ? 'animate-in' : ''}`}>
          <h2 className="section-title">Sobre Nosotros</h2>
          <p className="section-subtitle">
            Conoce la historia y el equipo detrás de Echenique Soluciones Inmobiliarias
          </p>
        </div>
        
        {/* Contenido principal unificado */}
        <div ref={contentRef} className={`about-content ${contentInView ? 'animate-in' : ''}`}>
          
          {/* Sección de Historia y Estadísticas */}
          <div className="about-section">
            <h3>Nuestra Historia</h3>
            <p>
              Echenique Soluciones Inmobiliarias nació en 2010 con la visión de transformar 
              la experiencia de compra, venta y alquiler de propiedades en Río Cuarto. 
              Fundada por Juan Echenique, un profesional con amplia experiencia en el sector, 
              nuestra empresa se ha consolidado como referente en el mercado local.
            </p>
            <p>
              A lo largo de más de una década, hemos ayudado a cientos de familias y 
              profesionales a encontrar su hogar ideal o la inversión perfecta, siempre 
              con el compromiso de ofrecer un servicio personalizado, transparente y de calidad.
            </p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Imagen integrada en el flujo de contenido */}
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Oficina de Echenique Soluciones Inmobiliarias" 
              className="about-img"
            />
            <div className="image-overlay">
              <div className="overlay-content">
                <h4>Desde 2010</h4>
                <p>Transformando el mercado inmobiliario de Río Cuarto</p>
              </div>
            </div>
          </div>

          {/* Sección de Misión y Valores */}
          <div className="about-section">
            <h3>Nuestra Filosofía</h3>
            <div className="mission-card">
              <FaQuoteLeft className="quote-icon" />
              <p>
                Brindar soluciones inmobiliarias integrales que superen las expectativas 
                de nuestros clientes, mediante un servicio personalizado, transparente y 
                profesional, aprovechando nuestro conocimiento del mercado local y las 
                últimas tecnologías disponibles.
              </p>
            </div>
          </div>
          
          <div className="about-section">
            <h3>Nuestros Valores</h3>
            <div className="values-grid">
              <div className="value-item">
                <FaMedal className="value-icon" />
                <div className="value-content">
                  <h4>Confianza</h4>
                  <p>Relaciones basadas en la honestidad y transparencia.</p>
                </div>
              </div>
              <div className="value-item">
                <FaLightbulb className="value-icon" />
                <div className="value-content">
                  <h4>Innovación</h4>
                  <p>Tecnología de punta para mejorar tu experiencia.</p>
                </div>
              </div>
              <div className="value-item">
                <FaHandshake className="value-icon" />
                <div className="value-content">
                  <h4>Compromiso</h4>
                  <p>Dedicación total para alcanzar tus objetivos.</p>
                </div>
              </div>
              <div className="value-item">
                <FaChartLine className="value-icon" />
                <div className="value-content">
                  <h4>Excelencia</h4>
                  <p>Buscamos la máxima calidad en nuestro servicio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sección del equipo */}
        <div ref={teamRef} className={`team-section ${teamInView ? 'animate-in' : ''}`}>
          <div className="section-header">
            <h3 className="team-title">Nuestro Equipo</h3>
            <p className="team-subtitle">
              Profesionales comprometidos con brindarte el mejor servicio
            </p>
          </div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                  <div className="member-overlay">
                    <div className="social-links">
                      <span>📧</span>
                      <span>💼</span>
                    </div>
                  </div>
                </div>
                <h4 className="member-name">{member.name}</h4>
                <p className="member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;