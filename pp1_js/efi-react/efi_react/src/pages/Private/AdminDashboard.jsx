import React from 'react';
import { Container, Typography, Alert, Box, Paper } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <Container sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, bgcolor: '#fff3e0' }}>
                <Typography variant="h3" color="primary" gutterBottom>
                    Panel de Administración
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Bienvenido, Administrador {user?.username}.
                </Typography>
                
                <Alert severity="warning">
                    **Pendiente:** Implementar tablas y herramientas para la gestión de usuarios, roles y moderación de contenido (comentarios/posts).
                </Alert>

                <Box sx={{ mt: 3 }}>
                    <Typography variant="body1">
                        Tu rol ({user?.role}) te permite acceder a esta sección protegida.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminDashboard;