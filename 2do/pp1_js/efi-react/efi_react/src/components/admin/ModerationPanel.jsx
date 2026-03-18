import React, { useState, useEffect } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Paper, Button, CircularProgress, Alert, Divider } from '@mui/material';
import { useSnackbar } from 'notistack';

// Placeholder para API de Moderación
const mockReportedContent = [
    { id: 101, type: 'Comentario', content: 'Esto es un comentario abusivo y spam.', status: 'Pending', reportCount: 5, target: 'Post ID 12' },
    { id: 205, type: 'Post', content: 'Publicación con contenido inapropiado y lenguaje ofensivo.', status: 'Pending', reportCount: 3, target: 'Post ID 205' },
];
const getReportedContent = async () => new Promise(resolve => setTimeout(() => resolve(mockReportedContent), 800));
const takeAction = async (contentId, action) => new Promise(resolve => setTimeout(() => resolve({ id: contentId, action }), 500));

const ModerationPanel = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    // Carga inicial del contenido reportado
    const fetchContent = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getReportedContent(); 
            setContent(data);
        } catch (err) {
            setError('Error al cargar el contenido reportado. Verifica el endpoint de moderación.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const handleAction = async (contentId, action) => {
        try {
            await takeAction(contentId, action); 
            
            // Elimina el elemento de la lista después de la acción exitosa
            setContent(prev => prev.filter(c => c.id !== contentId));
            
            enqueueSnackbar(`Acción '${action}' aplicada al contenido ID ${contentId}.`, { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Fallo al tomar acción.', { variant: 'error' });
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Contenido Pendiente de Moderación</Typography>
            {content.length === 0 ? (
                <Alert severity="success">¡No hay contenido pendiente de moderación! La comunidad está limpia. ✨</Alert>
            ) : (
                <Paper elevation={1}>
                    <List>
                        {content.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={`[${item.type}] Reportes: ${item.reportCount}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" variant="body2" color="text.primary" sx={{ mr: 1 }}>
                                                    {item.content}
                                                </Typography>
                                                — Objetivo: {item.target}
                                            </React.Fragment>
                                        }
                                    />
                                    <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                                        <Button 
                                            variant="contained" 
                                            color="error" 
                                            size="small" 
                                            onClick={() => handleAction(item.id, 'DELETE')}
                                        >
                                            Eliminar
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="success" 
                                            size="small" 
                                            onClick={() => handleAction(item.id, 'APPROVE')}
                                        >
                                            Aprobar/Descartar
                                        </Button>
                                    </Box>
                                </ListItem>
                                {index < content.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
};

export default ModerationPanel;