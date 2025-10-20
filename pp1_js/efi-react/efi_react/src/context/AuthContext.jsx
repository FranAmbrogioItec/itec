import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { decodeToken } from '../utils/jwtDecoder';
import { loginUser } from '../api/authApi';
import { useSnackbar } from 'notistack'; // Usamos Notistack para los toasts (Requisito UI)

// 1. Crear el Contexto
const AuthContext = createContext();

// Custom Hook para un acceso fácil y limpio al contexto
export const useAuth = () => useContext(AuthContext);

// 2. Definir el Proveedor del Contexto
export const AuthProvider = ({ children }) => {
    // user: { id, name, email, role, exp } o null
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();  

    // Cargar la sesión desde localStorage al montar la aplicación
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const decodedUser = decodeToken(token);
            if (decodedUser) {
                setUser(decodedUser);
            } else {
                // Token expirado o inválido
                localStorage.removeItem('access_token');
            }
        }
        setLoading(false);
    }, []);

    // ----------------------------------------------------------------------
    // Funciones de Lógica de Negocio
    // ----------------------------------------------------------------------

    const login = async (email, password) => {
        setLoading(true);
        try {
            // Llama a la API de Flask
            const token = await loginUser({ email, password });
            
            // Almacena y decodifica el token
            localStorage.setItem('access_token', token);
            const decodedUser = decodeToken(token);
            
            if (decodedUser) {
                setUser(decodedUser);
                enqueueSnackbar(`¡Bienvenido, ${decodedUser.name}!`, { variant: 'success' });
            } else {
                throw new Error("Token inválido recibido del servidor.");
            }
            return true; // Éxito
        } catch (error) {
            // Muestra mensaje de error del backend (Credenciales inválidas, etc.)
            const errorMessage = error.message || 'Error al iniciar sesión.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
            logout(); // Asegura la limpieza si hay error
            return false; // Fallo
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
        enqueueSnackbar('Sesión cerrada correctamente.', { variant: 'info' });
    };
    
    // Función para verificar roles (Requisito 3)
    const hasRole = (roles) => {
        if (!user) return false;
        // Si `roles` es un string, lo convierte a array
        const requiredRoles = Array.isArray(roles) ? roles : [roles];
        return requiredRoles.includes(user.role);
    };

    // ----------------------------------------------------------------------
    // Objeto de Valor del Contexto
    // ----------------------------------------------------------------------

    const contextValue = useMemo(() => ({
        user,
        isLoggedIn: !!user, // Booleano rápido para chequear sesión
        loading,
        login,
        logout,
        hasRole // Exporta la función de verificación de roles
    }), [user, loading]);

    if (loading) {
        // Aquí podrías mostrar un spinner global mientras se carga la sesión
        return <div>Cargando sesión...</div>; 
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};