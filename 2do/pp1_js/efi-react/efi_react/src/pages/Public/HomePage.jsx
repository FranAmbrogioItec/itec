import React, { useState, useEffect, useCallback } from 'react';
import { getPosts } from '../../api/postsApi';
import PostCard from '../../components/posts/PostCard';
import { Container, Grid, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    // Función para cargar los posts
    const loadPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (err) {
            console.error("Error al cargar posts:", err);
            setError('No se pudieron cargar las publicaciones. Intente más tarde.');
            enqueueSnackbar('Error al cargar las publicaciones.', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    }, [enqueueSnackbar]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    // Función callback para refrescar la lista tras una eliminación exitosa
    const handlePostDelete = useCallback((deletedPostId) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
    }, []);


    if (loading) {
        return (
            <Container sx={{ py: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Cargando publicaciones...</Typography>
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

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Últimos Posts
            </Typography>

            {posts.length === 0 ? (
                <Alert severity="info">No hay publicaciones para mostrar.</Alert>
            ) : (
                <Grid container spacing={4}>
                    {posts.map((post) => (
                        <Grid item key={post.id} xs={12} sm={6} md={4}>
                            <PostCard post={post} onDeleteSuccess={handlePostDelete} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default HomePage;