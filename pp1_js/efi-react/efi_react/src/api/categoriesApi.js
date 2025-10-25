// api/categoriesApi.js

import api from './axiosConfig'; // Cliente Axios configurado con base URL y JWT Interceptor

const CATEGORIES_URL = '/categories';

/**
 * [CRUD] Obtiene la lista de todas las categorías.
 * Endpoint: GET /api/categories
 * Nota: Asumo que esta ruta es pública o la necesita el frontend.
 */
export const getCategories = async () => {
    try {
        const response = await api.get(CATEGORIES_URL);
        // Asume que el backend devuelve la lista directamente: [ {id: 1, name: 'Tecnología'}, ... ]
        return response.data; 
    } catch (error) {
        throw error.response?.data || { message: 'Error al cargar las categorías.' };
    }
};

/**
 * [ADMIN] Crea una nueva categoría.
 * Endpoint: POST /api/categories
 * Requiere: Rol 'admin'
 * @param {string} name - Nombre de la nueva categoría.
 */
export const createCategory = async (name) => {
    try {
        const response = await api.post(CATEGORIES_URL, { name });
        // Asume que el backend devuelve la categoría recién creada
        return response.data.category; 
    } catch (error) {
        throw error.response?.data || { message: 'Error al crear la categoría.' };
    }
};

/**
 * [ADMIN] Elimina una categoría.
 * Endpoint: DELETE /api/categories/<categoryId>
 * Requiere: Rol 'admin'
 * @param {number} categoryId - ID de la categoría a eliminar.
 */
export const deleteCategory = async (categoryId) => {
    try {
        // El delete a menudo devuelve un 204 No Content, pero la llamada debe ser exitosa.
        await api.delete(`${CATEGORIES_URL}/${categoryId}`);
    } catch (error) {
        throw error.response?.data || { message: 'Error al eliminar la categoría.' };
    }
};

// Puedes añadir la función para editar/actualizar una categoría (PUT) aquí.
// export const updateCategory = async (categoryId, newName) => { /* ... */ };