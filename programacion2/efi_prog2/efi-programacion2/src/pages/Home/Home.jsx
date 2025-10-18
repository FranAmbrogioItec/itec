import React from 'react';
import Hero from '../../components/Hero/Hero';
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties';
import AboutPreview from '../../components/AboutPreview/AboutPreview';
import Services from '../../components/Services/Services';
import './Home.css';

const Home = ({ setCurrentPage, onSearch }) => {
  return (
    <div className="home-page">
      <Hero setCurrentPage={setCurrentPage} onSearch={onSearch} />
      <FeaturedProperties />
      <AboutPreview setCurrentPage={setCurrentPage} />
      <Services />
    </div>
  );
};

export default Home;