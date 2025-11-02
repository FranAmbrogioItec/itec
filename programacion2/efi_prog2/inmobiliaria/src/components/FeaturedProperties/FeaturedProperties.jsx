import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropertyCard from '../PropertyCard/PropertyCard';
import { featuredProperties } from '../../data/properties';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const FeaturedProperties = () => {
  return (
    <section className="
      bg-gradient-to-br from-gray-50 to-gray-100
      relative mt-5
    ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 " >
          <h2 className="text-4xl font-bold text-primary-dark mb-4 font-jakarta">
            Propiedades Destacadas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Descubre nuestras mejores propiedades en Río Cuarto y la región
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="py-5 pb-16 relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{ 
              clickable: true,
              el: '.swiper-pagination-custom',
            }}
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
            className="px-3 pb-12"
          >
            {featuredProperties.map((property) => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-next-custom 
            absolute top-1/2 -translate-y-1/2 right-4 
            w-12 h-12 bg-white rounded-full shadow-lg
            flex items-center justify-center
            text-primary cursor-pointer z-10
            transition-all duration-300
            hover:bg-primary hover:text-white hover:scale-110
            hidden md:flex
          ">
            →
          </div>
          
          <div className="swiper-button-prev-custom
            absolute top-1/2 -translate-y-1/2 left-4 
            w-12 h-12 bg-white rounded-full shadow-lg
            flex items-center justify-center
            text-primary cursor-pointer z-10
            transition-all duration-300
            hover:bg-primary hover:text-white hover:scale-110
            hidden md:flex
          ">
            ←
          </div>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom 
            absolute bottom-4 left-1/2 -translate-x-1/2
            flex gap-2 z-10
          "></div>
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-8">
          <Link 
            to="/sale" 
            className="
              inline-block border-2 border-primary text-primary
              px-8 py-4 rounded-lg font-semibold mb-4
              transition-all duration-300
              hover:bg-primary hover:text-white
              hover:scale-105 hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            "
          >
            Ver todas las propiedades
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;