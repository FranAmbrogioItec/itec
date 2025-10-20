import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import AuthPage from './pages/AuthPage'; // Usamos el mismo componente para Login/Register

// Componente de Layout base
const Layout = () => (
    <>
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
        </main>
        {/* Aquí iría un componente Footer.jsx si lo crearas */}
        <footer className="bg-gray-800 text-white mt-auto py-6 shadow-inner text-center">
            &copy; 2024 Miniblog. Todos los derechos reservados.
        </footer>
    </>
);


const App = () => {
  // Asegúrate de tener los estilos de Tailwind o CSS aplicados globalmente.
  const globalStyles = `
    body {
        font-family: 'Inter', sans-serif;
        background-color: #f3f4f6;
    }
    #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
  `;

  return (
    <>
      <style>{globalStyles}</style>
      <Router>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="post/:id" element={<PostDetailPage />} />
                <Route path="create" element={<CreatePostPage />} />
                <Route path="edit/:id" element={<CreatePostPage />} />
                <Route path="login" element={<AuthPage type="login" />} />
                <Route path="register" element={<AuthPage type="register" />} />
                <Route path="*" element={<div className="text-center p-20">404 | Página no encontrada</div>} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;