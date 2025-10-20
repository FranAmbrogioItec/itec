import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { getCategories } from '../../api/postsApi';
import { useSnackbar } from 'notistack';

const PostForm = ({ initialData = {}, onSubmit, isEdit = false, isSubmitting }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        content: initialData.content || '',
        // Usamos el ID de la categoría para enviarlo al backend, no el nombre
        category_id: initialData.category?.id || '', 
    });
    const [categories, setCategories] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const { enqueueSnackbar } = useSnackbar();

    // 1. Cargar la lista de categorías al montar el componente
    useEffect(() => {
        const fetchCategories = async () => {
            const cats = await getCategories();
            setCategories(cats);
        };
        fetchCategories();
    }, []);

    // 2. Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Limpiar errores de validación al escribir
        setValidationErrors({ ...validationErrors, [name]: '' });
    };

    // 3. Validación básica del formulario
    const validate = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = 'El título es obligatorio.';
        if (!formData.content.trim()) errors.content = 'El contenido es obligatorio.';
        if (!formData.category_id) errors.category_id = 'La categoría es obligatoria.';
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // Retorna true si no hay errores
    };

    // 4. Manejar el envío
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Llama a la función `onSubmit` que maneja la lógica de la API (crear/actualizar)
            onSubmit(formData);
        } else {
            enqueueSnackbar('Por favor, complete todos los campos requeridos correctamente.', { variant: 'error' });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                {isEdit ? 'Editar Post' : 'Crear Nuevo Post'}
            </Typography>

            {/* Título */}
            <TextField
                margin="normal"
                required
                fullWidth
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!validationErrors.title}
                helperText={validationErrors.title}
            />

            {/* Contenido */}
            <TextField
                margin="normal"
                required
                fullWidth
                label="Contenido"
                name="content"
                multiline
                rows={8}
                value={formData.content}
                onChange={handleChange}
                error={!!validationErrors.content}
                helperText={validationErrors.content}
            />

            {/* Categoría (Menú Desplegable) */}
            <FormControl fullWidth margin="normal" required error={!!validationErrors.category_id}>
                <InputLabel id="category-label">Categoría</InputLabel>
                <Select
                    labelId="category-label"
                    id="category_id"
                    name="category_id"
                    value={formData.category_id}
                    label="Categoría"
                    onChange={handleChange}
                >
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>Cargando categorías...</MenuItem>
                    )}
                </Select>
                {validationErrors.category_id && <Typography color="error" variant="caption">{validationErrors.category_id}</Typography>}
            </FormControl>

            {/* Botón de Enviar */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : (isEdit ? 'Actualizar Post' : 'Crear Post')}
            </Button>
        </Box>
    );
};

export default PostForm;