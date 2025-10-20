import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from 'notistack';
import AppRouter from './router/AppRouter'; // Lo crearemos en la Parte 3

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Proveedor de Toasts para mensajes de éxito/error */}
      <SnackbarProvider maxSnack={3}>
        {/* Proveedor de Autenticación (AuthContext) */}
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
);