// pages/Admin/AdminDashboard.jsx

import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
// Componente importado para mostrar las estadísticas (Implementado en el paso anterior)
import AnalyticsPanel from '../../components/admin/AnalyticsPanel'; 

// --- Componentes Placeholder para Gestión ---
// (Reemplaza estos con tus tablas reales de gestión cuando las implementes)
const UsersTable = () => (
    <Typography variant="h6" sx={{ p: 3 }}>
        👥 Herramientas de Gestión de Usuarios (Pendiente de implementación)
    </Typography>
);

const CategoriesManager = () => (
    <Typography variant="h6" sx={{ p: 3 }}>
        🏷️ Herramientas de Gestión de Categorías (Pendiente de implementación)
    </Typography>
);
// ------------------------------------------

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
 * Muestra las diferentes herramientas de gestión y estadísticas en pestañas.
 */
const AdminDashboard = () => {
    const { user } = useAuth();
    // 0 = Estadísticas, 1 = Usuarios, 2 = Categorías
    const [value, setValue] = useState(0); 

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            
            {/* Título de Bienvenida */}
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
                    {/* 🚀 CRÍTICO: Aquí se integra el componente de análisis */}
                    <AnalyticsPanel />
                </TabPanel>

                {/* Contenido de la Pestaña 1: Usuarios */}
                <TabPanel value={value} index={1}>
                    <UsersTable />
                </TabPanel>
                
                {/* Contenido de la Pestaña 2: Categorías */}
                <TabPanel value={value} index={2}>
                    <CategoriesManager />
                </TabPanel>
                
            </Paper>
        </Container>
    );
};

export default AdminDashboard;