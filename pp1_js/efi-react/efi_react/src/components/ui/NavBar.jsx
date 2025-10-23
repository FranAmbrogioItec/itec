import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const { isLoggedIn, user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigir al usuario al login después de cerrar sesión
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
        >
          Miniblog EFI
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}> 
          {/* Implementa el layout móvil o cambia xs: 'none' a xs: 'flex' para probar en cualquier tamaño */}
          {isLoggedIn && (
            <Button color="inherit" component={Link} to="/posts/new">
              Crear Post
            </Button>
          )}

          {hasRole('admin') && (
            <Button color="inherit" component={Link} to="/admin/dashboard">
              Admin
            </Button>
          )}

          {isLoggedIn ? (
            <>
              <Typography variant="body1" color="inherit" sx={{ mr: 2, alignSelf: 'center' }}>
                Hola, **{user?.name || user?.email}** ({user?.role})
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Iniciar Sesión
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Registrarse
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;