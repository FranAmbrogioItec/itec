import { jwtDecode } from "jwt-decode";

/**
 * Decodifica un JWT y extrae los datos del usuario.
 * @param {string} token - El JWT de acceso.
 * @returns {{id: number, name: string, email: string, role: string, exp: number}|null} - Objeto con datos del usuario o null.
 */
export const decodeToken = (token) => {
    try {
        if (!token) return null;
        
        // El token decodificado debe tener los 'claims' que insertaste en Flask
        const decoded = jwtDecode(token); 
        
        // Verifica si el token ha expirado
        if (decoded.exp * 1000 < Date.now()) {
            console.error("Token ha expirado.");
            return null; 
        }

        // Mapea las propiedades del token decodificado a un objeto de usuario
        return {
            id: decoded.user_id, // Usar 'user_id' según la implementación de tu Flask API
            name: decoded.username, // Usar 'username' o 'name' según tu Flask API
            email: decoded.email, 
            role: decoded.role, 
            exp: decoded.exp
        };
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};