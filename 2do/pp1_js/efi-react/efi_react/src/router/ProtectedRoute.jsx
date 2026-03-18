import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from 'notistack';

/**
 * Componente para proteger rutas.
 * Redirige si el usuario no está logueado o no tiene el rol requerido.
 * @param {Array<string>} allowedRoles - Array de roles permitidos (e.g., ['admin', 'moderator']).
 */
const ProtectedRoute = ({ allowedRoles }) => {
    const { isLoggedIn, user, hasRole, loading } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    
    // Mientras se verifica la sesión, no renderizar nada
    if (loading) {
        return <div>Cargando...</div>; 
    }

    // 1. Verificar si el usuario está autenticado
    if (!isLoggedIn) {
        enqueueSnackbar('Debes iniciar sesión para acceder a esta página.', { variant: 'warning' });
        // Redirigir al login si no está logueado
        return <Navigate to="/login" replace />;
    }

    // 2. Verificar el Rol 
    // El checkeo de rol es necesario solo si se especificaron roles permitidos
    if (allowedRoles && !hasRole(allowedRoles)) {
        enqueueSnackbar('Acceso denegado. No tienes los permisos necesarios.', { variant: 'error' });
        // Redirigir a la página principal o a una de "Acceso Denegado"
        return <Navigate to="/" replace />;
    }

    // Si pasa ambas verificaciones, renderiza el componente de la ruta
    return <Outlet />;
};

export default ProtectedRoute;