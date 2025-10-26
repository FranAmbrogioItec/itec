import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../../api/postsApi';
import { getReviewsByPostId } from '../../api/reviewsApi';
import { Container, Typography, CircularProgress, Alert, Box, Button, Divider} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../context/AuthContext';
import ReviewList from '../../components/reviews/ReviewList';
import ReviewForm from '../../components/reviews/ReviewForm';

const PostDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { user, hasRole, isLoggedIn } = useAuth();

    const [post, setPost] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lógica para verificar permisos de edición/eliminación del post
    const isPostOwner = post && user && user.id === post.author.id;
    const canEditPost = isPostOwner || hasRole(['admin', 'moderator']);
    const canDeletePost = isPostOwner || hasRole(['admin']);

    // Función para cargar los datos del post y los comentarios
    const loadPostData = useCallback(async () => {
        setLoading(true);
        try {
            // Cargar Post
            const postData = await getPostById(id);
            setPost(postData);

            // Cargar Reviews
            const reviewsData = await getReviewsByPostId(id);
            setReviews(reviewsData);

        } catch (err) {
            console.error("Error al cargar datos:", err);
            setError('No se pudo cargar el post. El ID puede ser inválido o la API no está disponible.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadPostData();
    }, [loadPostData]);

    // Función para manejar la eliminación del Post
    const handleDeletePost = async () => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar el post: "${post.title}"? Todos sus comentarios serán eliminados.`)) return;
        
        try {
            await deletePost(id);
            enqueueSnackbar('Post y comentarios eliminados exitosamente.', { variant: 'success' });
            navigate('/'); // Redirigir a la página principal
        } catch (error) {
            const message = error.message || 'No tienes permiso para eliminar este post.';
            enqueueSnackbar(message, { variant: 'error' });
        }
    };

    // Función callback para añadir un nuevo comentario a la lista local
    const handleReviewCreated = useCallback((newReview) => {
        // El backend devuelve el objeto del comentario, lo añadimos al estado
        setReviews(prevReviews => [newReview, ...prevReviews]);
    }, []);


    if (loading) {
        return (
            <Container sx={{ py: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Cargando post y comentarios...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!post) {
        return <Container sx={{ py: 4 }}><Alert severity="info">Post no encontrado.</Alert></Container>;
    }


    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
            {/* Detalle del Post */}
            <Box sx={{ mb: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Por **{post.author.username}** el {new Date(post.created_at).toLocaleDateString()}
                    {post.category && 
                        <Typography component="span" sx={{ ml: 1 }}>
                            en <strong style={{ color: '#1976d2' }}>{post.category.name}</strong>
                        </Typography>
                    }
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {post.content}
                </Typography>

                {/* Botones de Edición/Eliminación del Post */}
                <Box sx={{ mt: 3 }}>
                    {canEditPost && (
                        <Button 
                            component={RouterLink}
                            to={`/posts/edit/${post.id}`} 
                            variant="outlined" 
                            color="warning" 
                            sx={{ mr: 1 }}
                        >
                            Editar Post
                        </Button>
                    )}
                    {canDeletePost && (
                        <Button 
                            onClick={handleDeletePost}
                            variant="outlined" 
                            color="error"
                        >
                            Eliminar Post
                        </Button>
                    )}
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Gestión de Comentarios (Reviews) */}
            {isLoggedIn ? (
                // CRUD de Reviews - Formulario de creación
                <ReviewForm postId={id} onReviewCreated={handleReviewCreated} />
            ) : (
                <Alert severity="info" sx={{ mb: 4 }}>
                    <RouterLink to="/login" style={{ textDecoration: 'none' }}>Inicia sesión</RouterLink> para dejar un comentario.
                </Alert>
            )}

            {/* CRUD de Reviews - Listado */}
            <ReviewList reviews={reviews} setReviews={setReviews} />
            
        </Container>
    );
};

export default PostDetailPage;