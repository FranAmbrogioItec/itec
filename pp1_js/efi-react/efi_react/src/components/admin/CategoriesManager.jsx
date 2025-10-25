// components/admin/CategoriesManager.jsx
import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, CircularProgress, Alert, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCategories } from '../../api/postsApi'; // Asumo que getCategories existe
import { createCategory, deleteCategory } from '../../api/categoriesApi';
import { useSnackbar } from 'notistack';

const CategoriesManager = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const fetchCategories = async () => {
        try {
            const data = await getCategories(); // Asumo que esta función existe
            setCategories(data);
        } catch (err) {
            setError(err.message || 'Fallo al cargar la lista de categorías.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Manejador para crear nueva categoría
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) {
            enqueueSnackbar('El nombre de la categoría no puede estar vacío.', { variant: 'warning' });
            return;
        }

        setIsSubmitting(true);
        try {
            const newCat = await createCategory(newCategoryName);
            setCategories([...categories, newCat]); // Añade la nueva categoría al estado
            setNewCategoryName('');
            enqueueSnackbar(`Categoría '${newCategoryName}' creada.`, { variant: 'success' });
        } catch (err) {
            enqueueSnackbar(`Error al crear: ${err.message}`, { variant: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Manejador para eliminar categoría
    const handleDeleteCategory = async (categoryId, categoryName) => {
        if (!window.confirm(`¿Estás seguro de eliminar la categoría: ${categoryName}?`)) return;

        try {
            await deleteCategory(categoryId);
            setCategories(categories.filter(cat => cat.id !== categoryId)); // Filtra la eliminada
            enqueueSnackbar(`Categoría '${categoryName}' eliminada.`, { variant: 'success' });
        } catch (err) {
            enqueueSnackbar(`Error al eliminar: ${err.message}`, { variant: 'error' });
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Creación y Eliminación de Categorías</Typography>
            
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Crear Nueva Categoría</Typography>
                <Box component="form" onSubmit={handleCreateCategory} sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Nombre de Categoría"
                        variant="outlined"
                        size="small"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        required
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Crear'}
                    </Button>
                </Box>
            </Paper>

            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Categorías Existentes ({categories.length})</Typography>
            <List component={Paper} elevation={1}>
                {categories.map((cat) => (
                    <React.Fragment key={cat.id}>
                        <ListItem>
                            <ListItemText primary={cat.name} secondary={`ID: ${cat.id}`} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(cat.id, cat.name)}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default CategoriesManager;