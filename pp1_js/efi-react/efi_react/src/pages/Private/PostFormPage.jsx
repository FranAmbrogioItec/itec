import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Alert, CircularProgress } from '@mui/material';
import { createPost, getPostById, updatePost } from '../../api/postsApi';
import PostForm from '../../components/posts/PostForm';
import { useSnackbar } from 'notistack';

const PostFormPage = () => {
    const { id } = useParams(); // Obtiene 'id' si estamos en /posts/edit/:id
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const isEditMode = !!id; // True si hay un ID en la URL

    // 1. Si estamos en modo edición, cargamos los datos del post
    useEffect(() => {
        if (isEditMode) {
            const fetchPost = async () => {
                try {
                    const data = await getPostById(id);
                    setPost(data);
                } catch (err) {
                    setError('No se pudo cargar el post para editar. Verifique el ID.');
                    enqueueSnackbar('Error al cargar el post.', { variant: 'error' });
                } finally {
                    setLoading(false);
                }
            };
            fetchPost();
        } else {
            setLoading(false); // Modo creación, no hay que cargar nada
        }
    }, [id, isEditMode, enqueueSnackbar]);

    // 2. Función de envío que maneja CREAR o ACTUALIZAR
    const handleSubmit = async (formData) => {
        setSubmitting(true);
        try {
            if (isEditMode) {
                // Modo Edición (UPDATE)
                await updatePost(id, formData);
                enqueueSnackbar('Post actualizado exitosamente.', { variant: 'success' });
                navigate(`/posts/${id}`); // Redirigir al detalle
            } else {
                // Modo Creación (CREATE)
                const newPost = await createPost(formData);
                enqueueSnackbar('Post creado exitosamente.', { variant: 'success' });
                navigate(`/posts/${newPost.id}`); // Redirigir al nuevo detalle
            }
        } catch (err) {
            const message = err.message || `Error al ${isEditMode ? 'actualizar' : 'crear'} el post.`;
            setError(message);
            enqueueSnackbar(message, { variant: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    // 3. Renderizado condicional
    if (loading) {
        return (
            <Container sx={{ py: 4, textAlign: 'center' }}>
                <CircularProgress />
                <p>Cargando datos del post...</p>
            </Container>
        );
    }
    
    if (error && isEditMode) {
        return <Container sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;
    }


    // El formulario se renderiza si estamos creando (post=null) o si ya cargó el post (modo edición)
    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ mt: 8, mb: 4 }}>
                <PostForm
                    initialData={post || {}} // Si es nulo (creación), pasa un objeto vacío
                    onSubmit={handleSubmit}
                    isEdit={isEditMode}
                    isSubmitting={submitting}
                />
            </Box>
        </Container>
    );
};

export default PostFormPage;