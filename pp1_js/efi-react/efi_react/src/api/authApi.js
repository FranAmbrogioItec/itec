import api from './axiosConfig'; // Instancia de Axios configurada

const AUTH_URL = '/auth'; // Prefijo de tus rutas de autenticación si lo tienes. 
                         // Si usas /api/login directamente, omite el prefijo.

/**
 * Llama al endpoint de registro.
 * @param {object} userData - { username, email, password, role }
 * @returns {Promise<object>} - Respuesta de la API
 */
export const registerUser = async (userData) => {
    try {
        // Asumiendo que tu endpoint es POST /api/register
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        // Manejo de errores (ej: email duplicado, validación de Flask)
        throw error.response?.data || { message: 'Error de conexión.' };
    }
};

/**
 * Llama al endpoint de inicio de sesión.
 * @param {object} credentials - { email, password }
 * @returns {Promise<string>} - El token de acceso JWT
 */
export const loginUser = async (credentials) => {
    try {
        // Asumiendo que tu endpoint es POST /api/login
        const response = await api.post('/login', credentials);
        // Tu API Flask devuelve un objeto { access_token: "..." }
        return response.data.access_token; 
    } catch (error) {
        // Manejo de errores (ej: credenciales inválidas)
        throw error.response?.data || { message: 'Error de conexión.' };
    }
};