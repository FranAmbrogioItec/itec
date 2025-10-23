import api from './axiosConfig';

const POSTS_URL = '/posts';
const CATEGORIES_URL = '/categories';

/**
 * [CRUD] Obtiene la lista de todos los posts.
 * Endpoint: GET /api/posts
 */
export const getPosts = async () => {
    try {
        const response = await api.get(POSTS_URL);
        // Asumo que Flask devuelve una lista de objetos Post.
        return response.data; 
    } catch (error) {
        throw error.response?.data || { message: 'Error al cargar los posts.' };
    }
};

/**
 * [CRUD] Obtiene un post por su ID.
 * Endpoint: GET /api/posts/<id>
 */
export const getPostById = async (id) => {
    try {
        const response = await api.get(`${POSTS_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: `Error al cargar el post ${id}.` };
    }
};

/**
 * [CRUD] Crea un nuevo post. (Requiere JWT)
 * Endpoint: POST /api/posts
 */
export const createPost = async (postData) => {
    try {
        // postData: { title, content, category_name }
        const response = await api.post(POSTS_URL, postData);
        return response.data; // Devuelve el nuevo post creado o mensaje de éxito
    } catch (error) {
        throw error.response?.data || { message: 'Error al crear el post.' };
    }
};

/**
 * [CRUD] Actualiza un post existente. (Requiere JWT + Permisos)
 * Endpoint: PUT /api/posts/<id>
 */
export const updatePost = async (id, postData) => {
    try {
        const response = await api.put(`${POSTS_URL}/${id}`, postData);
        return response.data; // Devuelve el post actualizado
    } catch (error) {
        throw error.response?.data || { message: 'Error al actualizar el post.' };
    }
};

/**
 * [CRUD] Elimina un post. (Requiere JWT + Permisos)
 * Endpoint: DELETE /api/posts/<id>
 */
export const deletePost = async (id) => {
    try {
        const response = await api.delete(`${POSTS_URL}/${id}`);
        // El backend debería devolver 204 No Content o un mensaje de éxito.
        return response.data; 
    } catch (error) {
        throw error.response?.data || { message: 'Error al eliminar el post.' };
    }
};

/**
 * [Utilidad] Obtiene la lista de categorías.
 * Endpoint: GET /api/categories (Necesario para el formulario de Posts)
 */
export const getCategories = async () => {
    try {
        const response = await api.get(CATEGORIES_URL);
        // Asumo que Flask devuelve una lista de objetos Category: [{id: 1, name: "Tech"}, ...]
        return response.data; 
    } catch (error) {
        // No lanzamos error si fallan las categorías, solo devolvemos un array vacío.
        console.error("No se pudieron cargar las categorías:", error);
        return []; 
    }
}   