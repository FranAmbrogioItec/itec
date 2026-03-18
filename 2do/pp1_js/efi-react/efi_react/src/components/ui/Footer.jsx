import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 'auto', 
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
          Desarrollado por <a href="https://franciscoambrogio.com/" target='_blank'>Francisco Ambrogio</a>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;