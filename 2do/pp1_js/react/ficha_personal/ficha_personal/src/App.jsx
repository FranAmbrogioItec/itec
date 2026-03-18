import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Tarjeta from './components/Tarjeta';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tarjeta" element={<Tarjeta />} />
      </Routes>
    </Router>
  );
};

export default App;