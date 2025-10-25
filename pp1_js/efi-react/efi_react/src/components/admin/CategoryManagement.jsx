import React, { useState, useEffect } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useSnackbar } from 'notistack';
// ASUMIDO: getCategories ya existe. Las otras deben crearse en tu API.
import { getCategories } from '../../api/postsApi'; 

// Placeholder para API de CRUD de Categorías
const createCategory = async (name) => new Promise(resolve => setTimeout(() => resolve({ id: Date.now(), name }), 500));
const updateCategory = async (id, name) => new Promise(resolve => setTimeout(() => resolve({ id, name }), 500));
const deleteCategory = async (id) => new Promise(resolve => setTimeout(() => resolve({ id }), 500));

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ id: null, name: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    // Carga inicial de categorías
    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (err) {
            setError('Error al cargar las categorías. Verifica el endpoint GET /api/categories.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpenDialog = (category = { id: null, name: '' }) => {
        setCurrentCategory(category);
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        if (!currentCategory.name.trim()) {
            enqueueSnackbar('El nombre de la categoría no puede estar vacío.', { variant: 'warning' });
            return;
        }

        setIsSubmitting(true);
        try {
            let response;
            if (currentCategory.id) {
                // Edición: PUT /api/categories/<id>
                response = await updateCategory(currentCategory.id, currentCategory.name); 
                setCategories(prev => prev.map(c => c.id === response.id ? response : c));
                enqueueSnackbar(`Categoría ${response.name} actualizada.`, { variant: 'success' });
            } else {
                // Creación: POST /api/categories
                response = await createCategory(currentCategory.name); 
                setCategories(prev => [...prev, response]);
                enqueueSnackbar(`Categoría ${response.name} creada.`, { variant: 'success' });
            }
            setIsDialogOpen(false);
        } catch (err) {
            enqueueSnackbar('Error al guardar la categoría.', { variant: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (categoryId, categoryName) => {
        if (!window.confirm(`¿Estás seguro de eliminar la categoría "${categoryName}"? Los posts asociados pueden requerir manejo.`)) return;
        
        try {
            // Eliminación: DELETE /api/categories/<id>
            await deleteCategory(categoryId); 
            setCategories(prev => prev.filter(c => c.id !== categoryId));
            enqueueSnackbar(`Categoría ${categoryName} eliminada.`, { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Error al eliminar la categoría.', { variant: 'error' });
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Categorías del Sistema</Typography>
                <Button variant="contained" onClick={() => handleOpenDialog()}>
                    Crear Nueva
                </Button>
            </Box>
            
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell align="right">
                                    <Button color="primary" size="small" onClick={() => handleOpenDialog(category)}>
                                        Editar
                                    </Button>
                                    <Button color="error" size="small" sx={{ ml: 1 }} onClick={() => handleDelete(category.id, category.name)}>
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Diálogo de Creación/Edición */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>{currentCategory.id ? 'Editar Categoría' : 'Crear Nueva Categoría'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre de la Categoría"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentCategory.name}
                        onChange={(e) => setCurrentCategory({...currentCategory, name: e.target.value})}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>Cancelar</Button>
                    <Button onClick={handleSave} disabled={isSubmitting || !currentCategory.name.trim()} variant="contained">
                        {isSubmitting ? <CircularProgress size={24} /> : (currentCategory.id ? 'Guardar Cambios' : 'Crear')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CategoryManagement;