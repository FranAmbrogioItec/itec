import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Button
        label="Ir al Formulario"
        icon="pi pi-arrow-right"
        className="p-button-lg"
        onClick={() => navigate('/tarjeta')}
      />
    </div>
  );
};

export default Home;