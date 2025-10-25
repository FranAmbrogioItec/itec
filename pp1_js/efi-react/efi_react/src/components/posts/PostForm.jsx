import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { getCategories } from '../../api/postsApi';
import { useSnackbar } from 'notistack';

const PostForm = ({ initialData = {}, onSubmit, isEdit = false, isSubmitting }) => {
    
    // --- 1. Inicialización Robusta del Estado ---
    // El campo 'category' almacena el NOMBRE de la categoría para enviarlo al backend,
    // que es lo que Marshmallow espera (data_key="category").
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        content: initialData.content || '',
        // Al editar (isEdit=true), usa el nombre. Al crear (isEdit=false), inicia vacío.
        category: initialData.category_name || '', 
    });
    
    const [categories, setCategories] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    
    // 2. Cargar Categorías y Establecer Valor por Defecto (Solución al 400 en Creación)
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const cats = await getCategories();
                setCategories(cats);

                // *** Lógica para establecer la categoría por defecto en la CREACIÓN ***
                // Si es un nuevo post (isEdit=false) Y no hay una categoría seleccionada (formData.category es ""),
                // entonces forzamos la selección de la primera categoría cargada.
                if (!isEdit && cats.length > 0 && !formData.category) {
                    setFormData(prev => ({ ...prev, category: cats[0].name }));
                }
            } catch (error) {
                enqueueSnackbar('Error al cargar categorías.', { variant: 'error' });
            }
        };
        fetchCategories();
    // Agregamos isEdit y formData.category a las dependencias si queremos que re-evalúe la inicialización.
    }, [isEdit, enqueueSnackbar]); 
    
    // 3. Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setValidationErrors({ ...validationErrors, [name]: '' });
    };

    // 4. Validación básica del formulario (Reforzada)
    const validate = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = 'El título es requerido.';
        if (!formData.content.trim()) errors.content = 'El contenido es requerido.';
        
        // La categoría es requerida SÓLO si no se ha seleccionado un valor (no importa si es edición o creación,
        // aunque en edición el backend acepta vacío gracias al PostUpdateSchema).
        if (!formData.category.trim()) errors.category = 'Debe seleccionar una categoría.';

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    // 5. Manejar el envío
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // El payload que se envía a la API ya tiene la clave 'category' con el NOMBRE
            onSubmit(formData); 
        } else {
            enqueueSnackbar('Por favor, corrige los errores del formulario.', { variant: 'error' });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
            {/* Campo Título */}
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Título del Post"
                name="title"
                autoFocus
                value={formData.title}
                onChange={handleChange}
                error={!!validationErrors.title}
                helperText={validationErrors.title}
            />

            {/* Campo Contenido */}
            <TextField
                margin="normal"
                required
                fullWidth
                name="content"
                label="Contenido"
                id="content"
                multiline
                rows={6}
                value={formData.content}
                onChange={handleChange}
                error={!!validationErrors.content}
                helperText={validationErrors.content}
            />

            {/* Campo Categoría (Select) */}
            <FormControl fullWidth margin="normal" required error={!!validationErrors.category}>
                <InputLabel id="category-label">Categoría</InputLabel>
                <Select
                    labelId="category-label"
                    id="category" // <-- ID del componente
                    name="category" // <-- NOMBRE de la clave del JSON que el backend espera
                    value={formData.category} // <-- Usa el valor del NOMBRE de la categoría (string)
                    label="Categoría"
                    onChange={handleChange}
                >
                    {/* Al crear, este item está deshabilitado si ya inicializamos con la primera cat. */}
                    {/* Al editar, ofrece la opción de no seleccionar, aunque la validación lo hará requerido si no se cambia. */}
                    <MenuItem value="">{isEdit ? 'Mantener Categoría' : 'Seleccione una categoría'}</MenuItem> 
                    
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            // *** VALUE DEBE SER EL NOMBRE DE LA CATEGORÍA (STRING) ***
                            <MenuItem key={cat.id} value={cat.name}>
                                {cat.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>Cargando categorías...</MenuItem>
                    )}
                </Select>
                {validationErrors.category && <Typography color="error" variant="caption">{validationErrors.category}</Typography>}
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