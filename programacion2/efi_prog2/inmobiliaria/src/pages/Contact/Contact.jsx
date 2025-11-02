import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const whatsappMessage = `Hola, mi nombre es ${formData.name} ${formData.lastName}. ${formData.message}. Mi teléfono es: ${formData.phone} y mi email: ${formData.email}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/543584863428?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setFormData({
      name: '',
      lastName: '',
      phone: '',
      email: '',
      message: '',
    });
    
    alert('¡Gracias por tu mensaje! Serás redirigido a WhatsApp para completar la conversación.');
  };

  return (
    <section id="contact" className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-24 overflow-hidden text-gray-800">
      {/* Elementos decorativos de fondo */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-900/5 rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-600/10 rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-2 mt-5">Contacto</h2>
        <p className="text-lg text-gray-600 text-center mb-16">Estamos listos para ayudarte. ¡Hablemos!</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Información de contacto */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Nuestros datos de contacto</h3>
            <p className="text-gray-600 mb-8">
              Puedes comunicarte con nosotros directamente o visitar nuestra oficina.
            </p>
            
            <ul className="space-y-8">
              <li className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-teal-700 text-white text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Dirección</h4>
                  <p className="text-gray-600">Mitre 991, Río Cuarto, Córdoba</p>
                </div>
              </li>
              <li className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-teal-700 text-white text-xl">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">echenique@inmobiliaria.com</p>
                </div>
              </li>
              <li className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-teal-700 text-white text-xl">
                  <FaPhone />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Teléfono</h4>
                  <p className="text-gray-600">+54 358 123-4567</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl bg-gray-50 text-gray-800 transition-all duration-300 focus:outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-200"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Tu apellido"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl bg-gray-50 text-gray-800 transition-all duration-300 focus:outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-200"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Tu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl bg-gray-50 text-gray-800 transition-all duration-300 focus:outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-200"
                />
              </div>

              <div className="mb-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Tu teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl bg-gray-50 text-gray-800 transition-all duration-300 focus:outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-200"
                />
              </div>
              
              <div className="mb-6">
                <textarea
                  name="message"
                  placeholder="Tu consulta"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl bg-gray-50 text-gray-800 transition-all duration-300 focus:outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-200 resize-vertical"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-teal-700 to-teal-800 text-white py-4 px-8 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:opacity-90"
              >
                <FaWhatsapp className="text-xl" />
                Enviar por WhatsApp
              </button>
            </form>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Ubicación de nuestra oficina</h3>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3341.372674232127!2d-64.35574938805426!3d-33.12557258083882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d20013debe100d%3A0x281e554094107eef!2sMitre%20991%2C%20X5800%20BGO%2C%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1757885125109!5m2!1ses-419!2sar"
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la oficina"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;