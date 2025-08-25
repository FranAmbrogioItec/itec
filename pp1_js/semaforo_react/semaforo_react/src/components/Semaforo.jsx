import React, { useState, useEffect } from 'react';
import './Semaforo.css';

const Semaforo = () => {
  const [colorActivo, setColorActivo] = useState('rojo');
  const [modoAutomatico, setModoAutomatico] = useState(false);

  const cambiarColor = (color) => {
    if (color !== colorActivo) {
      setColorActivo(color);
    }
  };

  useEffect(() => {
    let intervalo;
    if (modoAutomatico) {
      intervalo = setInterval(() => {
        if (colorActivo === 'rojo') {
          setColorActivo('verde');
        } else if (colorActivo === 'verde') {
          setColorActivo('amarillo');
        } else {
          setColorActivo('rojo');
        }
      }, 2000); // Cambia cada 2 segundos
    }

    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [modoAutomatico, colorActivo]);

  return (
    <div className="semaforo-container">
      <h1>Semáforo con React</h1>
      
      <div className="semaforo">
        <div 
          className={`luz rojo ${colorActivo === 'rojo' ? 'activo' : ''}`}
          onClick={() => cambiarColor('rojo')}
        ></div>
        <div 
          className={`luz amarillo ${colorActivo === 'amarillo' ? 'activo' : ''}`}
          onClick={() => cambiarColor('amarillo')}
        ></div>
        <div 
          className={`luz verde ${colorActivo === 'verde' ? 'activo' : ''}`}
          onClick={() => cambiarColor('verde')}
        ></div>
      </div>

      <div className="controles">
        <button 
          className={`boton ${colorActivo === 'rojo' ? 'activo' : ''}`}
          onClick={() => cambiarColor('rojo')}
          disabled={colorActivo === 'rojo'}
        >
          Rojo
        </button>
        <button 
          className={`boton ${colorActivo === 'amarillo' ? 'activo' : ''}`}
          onClick={() => cambiarColor('amarillo')}
          disabled={colorActivo === 'amarillo'}
        >
          Amarillo
        </button>
        <button 
          className={`boton ${colorActivo === 'verde' ? 'activo' : ''}`}
          onClick={() => cambiarColor('verde')}
          disabled={colorActivo === 'verde'}
        >
          Verde
        </button>
      </div>

      <div className="modo-automatico">
        <button 
          className={`boton-automatico ${modoAutomatico ? 'activo' : ''}`}
          onClick={() => setModoAutomatico(!modoAutomatico)}
        >
          {modoAutomatico ? 'Detener' : 'Modo Automático'}
        </button>
      </div>

      <div className="indicador">
        <p>Estado actual: <span className={`texto-${colorActivo}`}>{colorActivo.toUpperCase()}</span></p>
      </div>
    </div>
  );
};

export default Semaforo;