// api/adminApi.js

import api from './axiosConfig'; // Cliente Axios configurado con base URL y JWT Interceptor

const ADMIN_URL = '/admin';
const USERS_URL = '/users';

/**
 * [ADMIN] Obtiene la lista completa de usuarios con sus roles.
 * Endpoint: GET /api/admin/users
 * Requiere: Rol 'admin'
 */
export const getAllUsers = async () => {
    try {
        const response = await api.get(`${ADMIN_URL}${USERS_URL}`);
        return response.data; 
    } catch (error) {
        // Devuelve el mensaje de error del backend o uno por defecto
        throw error.response?.data || { message: 'Error al cargar la lista de usuarios.' };
    }
};

/**
 * [ADMIN] Actualiza el rol de un usuario específico.
 * Endpoint: PUT /api/admin/users/<userId>/role
 * Requiere: Rol 'admin'
 * @param {number} userId - ID del usuario a modificar.
 * @param {string} newRole - Nuevo rol ('user', 'moderator', 'admin').
 */
export const updateUserRole = async (userId, newRole) => {
    try {
        // Enviar el nuevo rol en el cuerpo de la solicitud
        const response = await api.put(`${ADMIN_URL}${USERS_URL}/${userId}/role`, { role: newRole });
        return response.data.user; 
    } catch (error) {
        throw error.response?.data || { message: 'Error al actualizar el rol.' };
    }
};
