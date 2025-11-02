import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  FaMedal, 
  FaLightbulb, 
  FaHandshake, 
  FaChartLine,
  FaQuoteLeft,
  FaEnvelope,
  FaLinkedin
} from 'react-icons/fa';

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
    }
  ];

  const stats = [
    { number: '500+', label: 'Propiedades vendidas' },
    { number: '12+', label: 'Años de experiencia' },
    { number: '98%', label: 'Clientes satisfechos' },
    { number: '300+', label: 'Familias asesoradas' }
  ];

  const values = [
    { icon: FaMedal, title: 'Confianza', description: 'Relaciones basadas en la honestidad y transparencia.' },
    { icon: FaLightbulb, title: 'Innovación', description: 'Tecnología de punta para mejorar tu experiencia.' },
    { icon: FaHandshake, title: 'Compromiso', description: 'Dedicación total para alcanzar tus objetivos.' },
    { icon: FaChartLine, title: 'Excelencia', description: 'Buscamos la máxima calidad en nuestro servicio.' }
  ];

  return (
    <section id="about" className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50/30 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-float-slow"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3 animate-float-medium"></div>
      
      <div className="relative max-w-6xl mx-auto px-6 py-16 mt-5">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Nuestra Historia
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-jakarta">
            Sobre <span className="text-transparent bg-gradient-to-r from-primary to-primary-light bg-clip-text">Nosotros</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conoce la historia y el equipo detrás de Echenique Soluciones Inmobiliarias
          </p>
        </div>
        
        {/* Contenido principal */}
        <div 
          ref={contentRef}
          className={`transition-all duration-700 delay-200 ${
            contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Historia y Estadísticas */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-dark mb-6 font-jakarta">
              Nuestra Historia
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Texto */}
              <div className="space-y-4">
                <p className="text-gray-600 leading-8 text-lg">
                  Echenique Soluciones Inmobiliarias nació en 2010 con la visión de transformar 
                  la experiencia de compra, venta y alquiler de propiedades en Río Cuarto. 
                  Fundada por Juan Echenique, un profesional con amplia experiencia en el sector, 
                  nuestra empresa se ha consolidado como referente en el mercado local.
                </p>
                <p className="text-gray-600 leading-8 text-lg">
                  A lo largo de más de una década, hemos ayudado a cientos de familias y 
                  profesionales a encontrar su hogar ideal o la inversión perfecta, siempre 
                  con el compromiso de ofrecer un servicio personalizado, transparente y de calidad.
                </p>
              </div>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="text-3xl font-bold text-primary mb-2 font-jakarta">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Imagen destacada */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 group">
            <img 
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Oficina de Echenique Soluciones Inmobiliarias" 
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h4 className="text-2xl font-bold mb-2 font-jakarta">Desde 2010</h4>
              <p className="text-lg opacity-90">Transformando el mercado inmobiliario de Río Cuarto</p>
            </div>
          </div>

          {/* Misión y Valores */}
          <div className="space-y-12">
            {/* Misión */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-dark mb-6 font-jakarta">
                Nuestra Filosofía
              </h3>
              
              <div className="bg-gradient-to-r from-primary to-primary-light rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-6 left-6 text-white/20">
                  <FaQuoteLeft className="text-4xl" />
                </div>
                <p className="text-white text-xl leading-relaxed font-light relative z-10 italic">
                  Brindar soluciones inmobiliarias integrales que superen las expectativas 
                  de nuestros clientes, mediante un servicio personalizado, transparente y 
                  profesional, aprovechando nuestro conocimiento del mercado local y las 
                  últimas tecnologías disponibles.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-dark mb-8 font-jakarta">
                Nuestros Valores
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <value.icon />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 font-jakarta">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sección del equipo */}
        <div 
          ref={teamRef}
          className={`mt-20 transition-all duration-700 delay-400 ${
            teamInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Nuestro Equipo
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-jakarta">
              Conoce a nuestro <span className="text-transparent bg-gradient-to-r from-primary to-primary-light bg-clip-text">Equipo</span>
            </h3>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Profesionales comprometidos con brindarte el mejor servicio
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 rounded-2xl transition-all duration-300 flex items-center justify-center">
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300">
                        <FaEnvelope className="text-sm" />
                      </button>
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300">
                        <FaLinkedin className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-2 font-jakarta">
                  {member.name}
                </h4>
                <p className="text-primary font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;