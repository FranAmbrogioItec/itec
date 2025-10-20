import axios from 'axios';

// Obtiene la URL base de las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Crea una instancia personalizada de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

/**
 * Interceptor para añadir el token JWT a cada solicitud si está disponible.
 */
api.interceptors.request.use(
  (config) => {
    // 1. Obtener el token de localStorage
    const token = localStorage.getItem('access_token');

    // 2. Si el token existe, adjuntarlo al encabezado de la solicitud (Bearer Token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 3. Devolver la configuración modificada
    return config;
  },
  (error) => {
    // Manejar errores de solicitud (ej: problemas de red)
    return Promise.reject(error);
  }
);

// Exportar la instancia configurada
export default api;