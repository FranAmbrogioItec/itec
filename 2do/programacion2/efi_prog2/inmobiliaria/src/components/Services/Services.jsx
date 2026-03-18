import React from 'react';
import { 
  FaHome, 
  FaKey, 
  FaUmbrellaBeach, 
  FaClipboardList, 
  FaBalanceScale, 
  FaChartLine,
  FaWhatsapp // <-- 1. Importamos el ícono de WhatsApp
} from 'react-icons/fa';

// --- ATENCIÓN AQUÍ ---
// Define tu número de WhatsApp completo con el código de país (sin '+' ni '0')
// Ejemplo para Argentina: 5493581234567
const WHATSAPP_PHONE_NUMBER = "5493584863428"; 
// --------------------

const Services = () => {
  const services = [
    {
      icon: <FaHome />,
      title: 'Venta de Propiedades',
      description: 'Asesoramiento profesional para la compra y venta de propiedades, con amplia cartera de opciones en Río Cuarto y la región.',
      gradient: 'from-[#05444C] to-[#06565F]',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      icon: <FaKey />,
      title: 'Alquileres',
      description: 'Gestión completa de alquileres residenciales y comerciales, con contratos seguros y seguimiento personalizado.',
      gradient: 'from-[#05444C] to-[#06565F]',
      bgGradient: 'from-emerald-50 to-green-50'
    },
    {
      icon: <FaUmbrellaBeach />,
      title: 'Alquiler Temporario',
      description: 'Propiedades para vacaciones y estadías temporales, con todas las comodidades para disfrutar de tu tiempo libre.',
      gradient: 'from-[#05444C] to-[#06565F]',
      bgGradient: 'from-amber-50 to-orange-50'
    },
    {
      icon: <FaClipboardList />,
      title: 'Tasaciones',
      description: 'Valoraciones profesionales de propiedades con metodologías actualizadas y conocimiento del mercado local.',
      gradient: 'from-[#05444C] to-[#06565F]',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      icon: <FaBalanceScale />,
      title: 'Asesoramiento Legal',
      description: 'Asesoramiento integral en todos los aspectos legales de las operaciones inmobiliarias.',
      gradient: 'from-[#05444C] to-[#06565F]',
      bgGradient: 'from-indigo-50 to-blue-50'
    },
    {
      icon: <FaChartLine />,
      title: 'Marketing Inmobiliario',
      description: 'Estrategias de marketing digital y tradicional para maximizar la exposición de tu propiedad.',
      gradient: 'from-[#05444C] to-[#06565F]',
      bgGradient: 'from-red-50 to-rose-50'
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"></div>
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header (sin cambios) */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Lo que ofrecemos
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-jakarta">
            Servicios <span className="text-transparent bg-gradient-to-r from-primary to-primary-light bg-clip-text">Exclusivos</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Soluciones integrales y personalizadas para todas tus necesidades inmobiliarias, 
            con el respaldo de profesionales expertos en el mercado de Río Cuarto.
          </p>
        </div>
        
        {/* Grid de Servicios Mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            
            // <-- 2. Generamos el link de WhatsApp dinámicamente
            const whatsappMessage = `Hola Echenique Soluciones, me gustaría consultar por el servicio de "${service.title}".`;
            const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

            return (
              <div 
                key={index}
                className="
                  group relative bg-white rounded-3xl p-8
                  shadow-lg hover:shadow-2xl
                  border border-gray-100
                  transition-all duration-500 ease-out
                  hover:-translate-y-3
                  overflow-hidden
                  flex flex-col // <-- Añadido para que el botón no siempre quede abajo
                "
              >
                {/* Efecto de gradiente en hover (sin cambios) */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100
                  transition-opacity duration-500 ${service.bgGradient}
                `}></div>
                
                {/* Borde animado (sin cambios) */}
                <div className={`
                  absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient}
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  p-[2px] -z-10
                `}>
                  <div className="w-full h-full bg-white rounded-3xl"></div>
                </div>

                {/* <-- 3. CONTENIDO CENTRADO --> */}
                <div className="relative z-10 flex flex-col items-center flex-grow">
                  {/* Icono (ahora centrado gracias a 'items-center' del div padre) */}
                  <div className={`
                    w-20 h-20 rounded-2xl mb-6
                    bg-gradient-to-r ${service.gradient}
                    flex items-center justify-center
                    text-white text-2xl
                    shadow-lg group-hover:shadow-xl
                    transition-all duration-500 group-hover:scale-110
                    group-hover:rotate-3
                  `}>
                    {service.icon}
                  </div>
                  
                  {/* Título (con text-center) */}
                  <h3 className="
                    text-xl font-bold text-gray-900 mb-4
                    font-jakarta
                    group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text
                    transition-all duration-300
                    text-center
                  ">
                    {service.title}
                  </h3>
                  
                  {/* Descripción (con text-center y flex-grow) */}
                  <p className="
                    text-gray-600 leading-relaxed
                    group-hover:text-gray-700
                    transition-colors duration-300
                    text-center
                    flex-grow // <-- Hace que este <p> ocupe el espacio disponible
                  ">
                    {service.description}
                  </p>
                  
                  {/* Línea decorativa (se centra sola) */}
                  <div className={`
                    w-12 h-1 bg-gradient-to-r ${service.gradient} rounded-full
                    mt-6 opacity-0 group-hover:opacity-100
                    transition-all duration-500 delay-200
                    group-hover:w-20
                  `}></div>
                {/* <-- 4. BOTÓN DE WHATSAPP AÑADIDO --> */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-flex items-center justify-center gap-2
                    bg-[#25d366] hover:bg-[#128c7e]
                    text-white px-6 py-3 rounded-xl font-semibold
                    hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300
                    mt-8 shadow-md
                  `}
                >
                    <FaWhatsapp className="text-lg" />
                    Consultar
                  </a>
                </div>

                {/* Efecto de brillo en hover (sin cambios) */}
                <div className="
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                  -skew-x-12 -translate-x-full group-hover:translate-x-full
                  transition-transform duration-1000
                "></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action adicional (sin cambios) */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
            <span className="text-gray-700 font-semibold">
              ¿No encuentras lo que buscas?
            </span>
            <button className="
              bg-gradient-to-r from-primary to-primary-light
              text-white px-6 py-3 rounded-xl font-semibold
              hover:shadow-lg hover:-translate-y-1
              transition-all duration-300
              flex items-center gap-2
            ">
              <FaChartLine className="text-lg" />
              Consultar servicios personalizados
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;