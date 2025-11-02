import React, { useState, useEffect } from 'react';
import './Contact.css';
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
    <section id="contact" className="contact-page section">
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <p className="section-subtitle">Estamos listos para ayudarte. ¡Hablemos!</p>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="info-title">Nuestros datos de contacto</h3>
            <p className="info-subtitle">
              Puedes comunicarte con nosotros directamente o visitar nuestra oficina.
            </p>
            
            <ul className="contact-list">
              <li className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-text">
                  <h4>Dirección</h4>
                  <p>Mitre 991, Río Cuarto, Córdoba</p>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>echenique@inmobiliaria.com</p>
                </div>
              </li>
              <li className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-text">
                  <h4>Teléfono</h4>
                  <p>+54 358 123-4567</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Tu apellido"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Tu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Tu teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tu consulta"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-accent btn-large">
                <FaWhatsapp className="btn-icon" />
                Enviar por WhatsApp
              </button>
            </form>
          </div>
        </div>


        <div className="map-container">
          <h3>Ubicación de nuestra oficina</h3>
          <div className="map-wrapper">
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