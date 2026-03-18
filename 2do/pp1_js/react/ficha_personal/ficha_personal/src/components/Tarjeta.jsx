import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { SelectButton } from 'primereact/selectbutton';
import Swal from 'sweetalert2';
import { Toast } from 'primereact/toast';

const colores = [
  { name: 'Rojo', value: 'rojo' },
  { name: 'Azul', value: 'azul' },
  { name: 'Verde', value: 'verde' },
];

const Tarjeta = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [color, setColor] = useState(null);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [formValido, setFormValido] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const esValido =
      nombre.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      color !== null &&
      aceptaTerminos;

    setFormValido(esValido);
  }, [nombre, email, color, aceptaTerminos]);

  const handleGuardar = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se guardarán tus datos.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevaPersona = {
          nombre,
          email,
          color,
          fecha: new Date().toISOString(),
        };

        const personasGuardadas = JSON.parse(localStorage.getItem('personas')) || [];
        const nuevoArray = [...personasGuardadas, nuevaPersona];
        localStorage.setItem('personas', JSON.stringify(nuevoArray));

        Swal.fire({
          title: '¡Guardado!',
          text: 'Tus datos han sido guardados.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: 'top-end',
        });

        handleLimpiar();
      }
    });
  };

  const handleLimpiar = () => {
    setNombre('');
    setEmail('');
    setColor(null);
    setAceptaTerminos(false);
  };

  const header = (
    <div className="text-center p-3">
      <h2>Mini Formulario</h2>
    </div>
  );

  const footer = (
    <div className="flex gap-2 justify-content-center">
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-success"
        onClick={handleGuardar}
        disabled={!formValido}
      />
      <Button
        label="Limpiar"
        icon="pi pi-times"
        className="p-button-secondary"
        onClick={handleLimpiar}
      />
    </div>
  );

  return (
    <div className="card-container flex justify-content-center align-items-center p-5" style={{ minHeight: '100vh' }}>
      <Card header={header} footer={footer} className="md:w-30rem">
        <div className="p-fluid">
          <div className="field">
            <span className="p-float-label">
              <InputText id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              <label htmlFor="nombre">Nombre</label>
            </span>
          </div>
          <div className="field mt-4">
            <span className="p-float-label">
              <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="field mt-4">
            <label htmlFor="color">Color favorito:</label>
            <SelectButton
              id="color"
              value={color}
              onChange={(e) => setColor(e.value)}
              options={colores}
              optionLabel="name"
              optionValue="value"
            />
          </div>
          <div className="field-checkbox mt-4">
            <Checkbox
              inputId="terminos"
              checked={aceptaTerminos}
              onChange={(e) => setAceptaTerminos(e.checked)}
            />
            <label htmlFor="terminos" className="ml-2">
              Acepto los términos
            </label>
          </div>
        </div>
      </Card>
      <Toast ref={toast} />
    </div>
  );
};

export default Tarjeta;