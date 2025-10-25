// api/analyticsApi.js

import api from './axiosConfig'; // Cliente Axios con interceptor de token

const ADMIN_URL = '/admin';

/**
 * Obtiene las estadísticas resumidas del sistema.
 * Endpoint: GET /api/admin/stats
 * Requiere: Rol 'admin'
 */
export const getAdminStats = async () => {
    try {
        const response = await api.get(`${ADMIN_URL}/stats`);
        // Devuelve el objeto de estadísticas
        return response.data.stats; 
    } catch (error) {
        // Maneja errores de permisos (403) o fallas de red/servidor
        throw error.response?.data || { message: 'Error al cargar las estadísticas.' };
    }
};