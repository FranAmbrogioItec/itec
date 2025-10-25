// pages/Admin/AdminDashboard.jsx

import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

// 1. Componentes de Gestión COMPLETADOS
import AnalyticsPanel from '../../components/admin/AnalyticsPanel'; // Para las estadísticas
import UsersManager from '../../components/admin/UsersManager';     // Para la gestión de usuarios
import CategoriesManager from '../../components/admin/CategoriesManager'; // Para la gestión de categorías

// Componente auxiliar para el contenido de las pestañas
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`admin-tabpanel-${index}`}
            aria-labelledby={`admin-tab-${index}`}
            {...other}
        >
            {/* Solo renderiza el contenido de la pestaña activa */}
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

/**
 * Panel de Control del Administrador.
 * Implementa la navegación con pestañas para las herramientas de gestión.
 */
const AdminDashboard = () => {
    const { user } = useAuth();
    
    // Estado para controlar la pestaña activa: 0 = Estadísticas, 1 = Usuarios, 2 = Categorías
    const [value, setValue] = useState(0); 

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            
            {/* Título y Bienvenida */}
            <Typography variant="h3" color="primary" gutterBottom>
                Panel de Administración
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                Bienvenido, Administrador {user?.username}. Tu rol es **{user?.role}**.
            </Typography>

            <Paper elevation={3}>
                {/* Pestañas de Navegación */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="Pestañas de Administración">
                        <Tab label="📊 Estadísticas" />
                        <Tab label="👥 Gestión de Usuarios" />
                        <Tab label="🏷️ Gestión de Categorías" />
                    </Tabs>
                </Box>
                
                {/* Contenido de la Pestaña 0: Estadísticas */}
                <TabPanel value={value} index={0}>
                    <AnalyticsPanel />
                </TabPanel>

                {/* Contenido de la Pestaña 1: Gestión de Usuarios */}
                <TabPanel value={value} index={1}>
                    <UsersManager /> {/* Componente funcional de gestión de usuarios */}
                </TabPanel>
                
                {/* Contenido de la Pestaña 2: Gestión de Categorías */}
                <TabPanel value={value} index={2}>
                    <CategoriesManager /> {/* Componente funcional de gestión de categorías */}
                </TabPanel>
                
            </Paper>
        </Container>
    );
};

export default AdminDashboard;