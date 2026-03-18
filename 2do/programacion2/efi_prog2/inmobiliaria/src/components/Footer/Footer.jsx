import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#033a41] text-white/80 py-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          
          {/* Logo y Redes Sociales */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-jakarta text-white mb-2">
                ECHENIQUE
              </h3>
              <span className="text-white/60 text-sm block mb-4">
                Soluciones Inmobiliarias
              </span>
            </div>
            <p className="text-white/80 leading-7 mb-6">
              Tu partner confiable en el mercado inmobiliario de Río Cuarto, Córdoba.
            </p>
            
            {/* Redes Sociales */}
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="
                  w-10 h-10 flex items-center justify-center
                  bg-white/5 border border-white/10 rounded-full
                  text-white text-lg
                  transition-all duration-300
                  hover:bg-accent hover:text-[#033a41] 
                  hover:scale-110 hover:-translate-y-1
                "
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="
                  w-10 h-10 flex items-center justify-center
                  bg-white/5 border border-white/10 rounded-full
                  text-white text-lg
                  transition-all duration-300
                  hover:bg-accent hover:text-[#033a41] 
                  hover:scale-110 hover:-translate-y-1
                "
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://wa.me/5493581234567" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="
                  w-10 h-10 flex items-center justify-center
                  bg-white/5 border border-white/10 rounded-full
                  text-white text-lg
                  transition-all duration-300
                  hover:bg-accent hover:text-[#033a41] 
                  hover:scale-110 hover:-translate-y-1
                "
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="
              text-xl font-semibold text-white mb-6 pb-3
              relative
              after:content-[''] after:absolute after:bottom-0 after:left-0
              after:w-8 after:h-0.5 after:bg-accent
            ">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Inicio" },
                { to: "/about", label: "Nosotros" },
                { to: "/sale", label: "Venta" },
                { to: "/rental", label: "Alquiler" },
                { to: "/temporal", label: "Alquiler Temporal" },
                { to: "/contact", label: "Contacto" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to}
                    className="
                      text-white/80 no-underline
                      transition-all duration-300
                      hover:text-accent hover:pl-2
                      block
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="
              text-xl font-semibold text-white mb-6 pb-3
              relative
              after:content-[''] after:absolute after:bottom-0 after:left-0
              after:w-8 after:h-0.5 after:bg-accent
            ">
              Contacto
            </h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" />
                <span>Mitre 991, Río Cuarto</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-accent mt-1 flex-shrink-0" />
                <span>+54 358 4863 428</span>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-accent mt-1 flex-shrink-0" />
                <span>echeniqueinmobiliaria@gmail.com</span>
              </li>
            </ul>
            
            {/* Mapa */}
            <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3341.372674232127!2d-64.35574938805426!3d-33.12557258083882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d20013debe100d%3A0x281e554094107eef!2sMitre%20991%2C%20X5800%20BGO%2C%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1757885125109!5m2!1ses-419!2sar" 
                width="100%" 
                height="150" 
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Echenique Inmobiliaria en Río Cuarto"
                className="block"
              >
              </iframe>
            </div>
          </div>

          {/* Horario de Atención */}
          <div>
            <h4 className="
              text-xl font-semibold text-white mb-6 pb-3
              relative
              after:content-[''] after:absolute after:bottom-0 after:left-0
              after:w-8 after:h-0.5 after:bg-accent
            ">
              Horario de Atención
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaClock className="text-accent mt-1 flex-shrink-0" />
                <span>Lunes a Viernes: 9:00 - 18:00</span>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="text-accent mt-1 flex-shrink-0" />
                <span>Sábados: 9:00 - 13:00</span>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="text-accent mt-1 flex-shrink-0" />
                <span>Domingos: Cerrado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 m-0">
            &copy; {new Date().getFullYear()} Echenique Soluciones Inmobiliarias. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  