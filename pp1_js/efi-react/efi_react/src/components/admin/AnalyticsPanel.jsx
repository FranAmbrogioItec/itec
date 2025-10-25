// components/admin/AnalyticsPanel.jsx

import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, CircularProgress, Alert, Card, CardContent } from '@mui/material';
// Importar íconos para las tarjetas
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import PublicIcon from '@mui/icons-material/Public';
import { getAdminStats } from '../../api/analyticsApi'; // <-- Importar la nueva API

// Componente auxiliar para mostrar una métrica
const StatCard = ({ title, value, icon, color }) => (
    <Card elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 2, borderLeft: `5px solid ${color}` }}>
        <Box sx={{ color, mr: 2, fontSize: 40, display: 'flex', alignItems: 'center' }}>
            {icon}
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 0, '&:last-child': { pb: 0 } }}>
            <Typography color="textSecondary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h4" component="div">
                {value}
            </Typography>
        </CardContent>
    </Card>
);

const AnalyticsPanel = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const data = await getAdminStats(); 
                setStats(data);
                setError(null);
            } catch (err) {
                const errorMessage = err.message || "Error desconocido al cargar las estadísticas.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">Error al cargar estadísticas: {error}</Alert>;
    
    // Si no hay datos (ej: el backend devolvió un objeto vacío, aunque no debería)
    if (!stats) return <Alert severity="warning">No se encontraron estadísticas para mostrar.</Alert>;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Métricas Clave del Sistema
            </Typography>
            <Grid container spacing={3}>
                
                {/* Métrica 1: Usuarios */}
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Total de Usuarios" 
                        value={stats.total_users || 0} 
                        icon={<PeopleIcon fontSize="inherit" />} 
                        color="#1976d2" 
                    />
                </Grid>
                
                {/* Métrica 2: Posts Totales */}
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Total de Posts" 
                        value={stats.total_posts || 0} 
                        icon={<DescriptionIcon fontSize="inherit" />} 
                        color="#d32f2f" 
                    />
                </Grid>
                
                {/* Métrica 3: Posts Publicados */}
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Posts Publicados" 
                        value={stats.published_posts || 0} 
                        icon={<PublicIcon fontSize="inherit" />} 
                        color="#388e3c" 
                    />
                </Grid>
                
                {/* Métrica 4: Categorías */}
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Total de Categorías" 
                        value={stats.total_categories || 0} 
                        icon={<CategoryIcon fontSize="inherit" />} 
                        color="#f57c00" 
                    />
                </Grid>
            </Grid>
            
            <Alert severity="info" sx={{ mt: 4 }}>
                Estos datos son en tiempo real y solo son visibles para el rol **`admin`**.
            </Alert>
        </Box>
    );
};

export default AnalyticsPanel;