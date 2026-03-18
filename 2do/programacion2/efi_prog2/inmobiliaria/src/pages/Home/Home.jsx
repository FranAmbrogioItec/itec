import React from 'react';
import Hero from '../../components/Hero/Hero';
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties';
import AboutPreview from '../../components/AboutPreview/AboutPreview';
import Services from '../../components/Services/Services';

const Home = ({ setCurrentPage, onSearch }) => {
  return (
    <div className="overflow-x-hidden">
      <Hero setCurrentPage={setCurrentPage} onSearch={onSearch} />
      <FeaturedProperties />
      <AboutPreview setCurrentPage={setCurrentPage} />
      <Services />
    </div>
  );
};

export default Home;