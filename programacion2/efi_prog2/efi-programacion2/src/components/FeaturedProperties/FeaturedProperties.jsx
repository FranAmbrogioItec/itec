import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropertyCard from '../PropertyCard/PropertyCard';
import { featuredProperties } from '../../data/properties';
import './FeaturedProperties.css';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const FeaturedProperties = () => {
  return (
    <section className="featured-properties section">
      <div className="container">
        <div className="featured-header">
          <h2 className="section-title">Propiedades Destacadas</h2>
          <p className="section-subtitle">
            Descubre nuestras mejores propiedades en Río Cuarto y la región
          </p>
        </div>
        
        <div className="featured-carousel">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="featured-swiper"
          >
            {featuredProperties.map((property) => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="view-all-btn">
          <Link to="/sale" className="btn btn-outline btn-large">
            Ver todas las propiedades
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;