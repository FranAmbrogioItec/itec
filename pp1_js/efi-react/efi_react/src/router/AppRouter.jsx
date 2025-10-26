import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; 

// Vistas Públicas (Login y Registro)
import LoginPage from '../pages/Public/LoginPage';
import RegisterPage from '../pages/Public/RegisterPage';
import HomePage from '../pages/Public/HomePage'; 

// Vistas Privadas (CRUD y Dashboard Admin)
import PostListPage from '../pages/Private/PostListPage';
import PostFormPage from '../pages/Private/PostFormPage';
import PostDetailPage from '../pages/Private/PostDetailPage';
import AdminDashboard from '../pages/Private/AdminDashboard';

// Componentes de Interfaz de Usuario (UI)
import NavBar from '../components/ui/NavBar';
import Footer from '../components/ui/Footer';

const AppRouter = () => {
  return (
    <>
      <NavBar /> {/* Barra de navegación visible en todas las páginas */}
      <main className="container my-4">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Rutas Públicas (detalle de post, aunque el CRUD sea privado) */}
          <Route path="/posts/:id" element={<PostDetailPage />} />
          
          {/* ------------------------------------------------------------- */}
          {/* Rutas Privadas y Protegidas (Usan el componente ProtectedRoute) */}
          {/* ------------------------------------------------------------- */}
          
          {/* Rutas que requieren cualquier usuario autenticado (rol 'user' o superior) */}
          <Route element={<ProtectedRoute allowedRoles={['user', 'moderator', 'admin']} />}>
            <Route path="/posts/new" element={<PostFormPage />} />        {/* Crear Post */}
            <Route path="/posts/edit/:id" element={<PostFormPage />} />  {/* Editar Post */}
            <Route path="/myposts" element={<PostListPage />} />          {/* Listar Posts propios */}
          </Route>

          {/* Ruta exclusiva para el rol 'admin' (Requisito 3) */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Aquí irían otras rutas de gestión de usuarios/roles solo para admins */}
          </Route>

          <Route path="*" element={<h1>404: Página No Encontrada</h1>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRouter;