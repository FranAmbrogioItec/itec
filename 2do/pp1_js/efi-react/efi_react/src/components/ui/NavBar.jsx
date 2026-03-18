// src/components/layout/NavBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PostAdd, Settings, Login, PersonAdd } from '@mui/icons-material'; // Nuevos íconos

const NavBar = () => {
  const { isLoggedIn, user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null); // Para el menú de usuario/admin

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Título/Logo del Miniblog */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'white', fontWeight: 'bold' }}
        >
          Miniblog EFI
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          
          {/* 1. Botón de CREAR POST (Visible para usuarios logueados) */}
          {isLoggedIn && (
            <Button 
              color="inherit" 
              component={Link} 
              to="/posts/new"
              startIcon={<PostAdd />} // Icono para mayor claridad
              sx={{ mr: 1 }}
            >
              Crear Post
            </Button>
          )}

          {/* 2. Botón de PANEL DE GESTIÓN (Visible solo para Admin/Moderador) */}
          {hasRole('admin') || hasRole('moderator') ? (
            <Button 
              color="inherit" 
              component={Link} 
              to="/admin/dashboard"
              startIcon={<Settings />} // Icono de engranaje/configuración
              sx={{ mr: 1, bgcolor: 'primary.dark' }} // Resaltar el botón de gestión
            >
              Panel
            </Button>
          ) : null}

          {/* 3. Opciones de AUTENTICACIÓN */}
          {isLoggedIn ? (
            <>
              {/* Menú para Cerrar Sesión y mostrar el rol */}
              <Button
                size="large"
                aria-label="Cuenta del usuario actual"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {/* Muestra el nombre/email y el rol */}
                Hola, **{user?.username || user?.email}** ({user?.role})
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* Opción de Perfil (Pendiente de implementar) */}
                {/* <MenuItem onClick={handleClose}>Mi Perfil</MenuItem> */}
                
                {/* Opción de Cerrar Sesión */}
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                  Cerrar Sesión
                </MenuItem>
              </Menu>

              <Button color="inherit" onClick={handleMenu} >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              {/* Botones de Login y Registro */}
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                startIcon={<Login />}
              >
                Iniciar Sesión
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/register"
                startIcon={<PersonAdd />}
              >
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