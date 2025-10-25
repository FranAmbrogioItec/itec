import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Alert, CircularProgress } from '@mui/material';
import { createPost, getPostById, updatePost } from '../../api/postsApi';
import PostForm from '../../components/posts/PostForm';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../context/AuthContext';

const PostFormPage = () => {
    const { id } = useParams(); // Obtiene 'id' si estamos en /posts/edit/:id
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { user, isLoggedIn } = useAuth(); // Usado para asegurar la carga

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
                    // El mensaje de error visible al usuario (aunque el 404 de /undefined aún podría estar en la consola)
                    enqueueSnackbar('No se pudo cargar el post. El ID puede ser inválido o la API no está disponible.', { variant: 'error' });
                } finally {
                    setLoading(false);
                }
            };
            fetchPost();
        } else {
            setLoading(false); // Modo creación, no hay que cargar nada
        }
    }, [id, isEditMode, enqueueSnackbar]); // Dependencia 'id' asegura que el efecto se dispara

    // 2. Manejador de envío del formulario
    const handleSubmit = async (formData) => {
        setError(null);
        setSubmitting(true);

        try {
            if (!isEditMode) { 
                // Modo Creación (CREATE)
                const newPostResponse = await createPost(formData);
                
                // *** CORRECCIÓN CRÍTICA: Acceder al ID anidado ***
                // El backend devuelve { message: "...", post: { id: X, ... } }
                const newPostId = newPostResponse?.post?.id; 

                if (newPostId) {
                    enqueueSnackbar('Post creado exitosamente.', { variant: 'success' });
                    // Redirigir al detalle del nuevo post usando el ID correcto
                    navigate(`/posts/${newPostId}`); 
                } else {
                    // Manejar error si la API no devuelve el ID, aunque la llamada HTTP fue exitosa.
                    throw new Error("El servidor no devolvió el ID del post creado.");
                }
            } else { 
                // Modo Edición (UPDATE)
                await updatePost(id, formData);
                enqueueSnackbar('Post actualizado exitosamente.', { variant: 'success' });
                navigate(`/posts/${id}`); // Redirigir al detalle, usando el ID existente
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
    // Muestra un mensaje si no estás loggeado en modo creación.
    if (!isLoggedIn && !isEditMode && !loading) {
         return (
             <Container sx={{ py: 4 }}><Alert severity="warning">Debes iniciar sesión para crear un post.</Alert></Container>
         )
    }
    
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
                <Typography component="h1" variant="h4" gutterBottom>
                    {isEditMode ? 'Editar Post' : 'Crear Nuevo Post'}
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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