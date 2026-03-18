import api from './axiosConfig';

const POSTS_URL = '/posts';
const COMMENTS_URL = '/comments';

/**
 * [CRUD] Obtiene la lista de comentarios para un post específico.
 * Endpoint: GET /api/posts/<post_id>/comments
 */
export const getReviewsByPostId = async (postId) => {
    try {
        const response = await api.get(`${POSTS_URL}/${postId}${COMMENTS_URL}`);
        return response.data; 
    } catch (error) {
        throw error.response?.data || { message: 'Error al cargar los comentarios.' };
    }
};

/**
 * [CRUD] Crea un nuevo comentario en un post. (Requiere JWT: user+)
 * Endpoint: POST /api/posts/<post_id>/comments
 */
export const createReview = async (postId, reviewData) => {
    try {
        // reviewData: { text }
        const response = await api.post(`${POSTS_URL}/${postId}${COMMENTS_URL}`, reviewData);
        return response.data.comment; 
    } catch (error) {
        throw error.response?.data || { message: 'Error al crear el comentario.' };
    }
};

/**
 * [CRUD] Elimina un comentario por su ID. (Requiere JWT + Permisos)
 * Endpoint: DELETE /api/comments/<review_id>
 */
export const deleteReview = async (reviewId) => {
    try {
        const response = await api.delete(`${COMMENTS_URL}/${reviewId}`);
        return response.data; // 204
    } catch (error) {
        // El backend de Flask debe manejar el error 403 (Permiso denegado) o 404 (No encontrado)
        throw error.response?.data || { message: 'Error al eliminar el comentario.' };
    }
};