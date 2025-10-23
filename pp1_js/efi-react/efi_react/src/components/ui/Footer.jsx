import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 'auto', // Esto empuja el footer hacia abajo
        py: 3, 
        px: 2, 
        backgroundColor: (theme) => 
          theme.palette.mode === 'light' 
            ? theme.palette.grey[200] 
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {new Date().getFullYear()} Miniblog EFI. Todos los derechos reservados.
        </Typography>
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          Desarrollado con React y Material UI.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;