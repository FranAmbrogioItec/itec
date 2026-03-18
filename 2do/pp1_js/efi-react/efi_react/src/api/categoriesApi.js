import api from './axiosConfig';

const CATEGORIES_URL = '/categories';

/**
 * [CRUD] Obtiene la lista de todas las categorías.
 * Endpoint: GET /api/categories
 * Nota: Asumo que esta ruta es pública o la necesita el frontend.
 */
export const getCategories = async () => {
    try {
        const response = await api.get(CATEGORIES_URL);
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
        return response.data.category; 
    } catch (error) {
        throw error.response?.data || { message: 'Error al crear la categoría.' };
    }
};

/**
 * [ADMIN] Elimina una categoría.
 * Endpoint: DELETE /api/categories/<categoryId>
 * Requiere: Rol 'admin'
 * @param {number} categoryId 
 */
export const deleteCategory = async (categoryId) => {
    try {
        await api.delete(`${CATEGORIES_URL}/${categoryId}`);
    } catch (error) {
        throw error.response?.data || { message: 'Error al eliminar la categoría.' };
    }
};