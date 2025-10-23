import React from 'react';
import { Container, Typography, Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
// NOTA: Aquí se usaría una función de la API como `getPostsByUserId(user.id)`
// y se listaría usando el componente PostCard.

const PostListPage = () => {
    const { user } = useAuth();

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Mis Publicaciones
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
                **Pendiente:** Implementar la lógica para cargar y mostrar **solo** los posts creados por el usuario actual ({user?.username}).
            </Alert>
            {/* Aquí iría la lógica de carga y el <Grid> con los <PostCard>
            <Grid container spacing={4}>
                {myPosts.map((post) => (
                    <Grid item key={post.id} xs={12} sm={6} md={4}>
                        <PostCard post={post} onDeleteSuccess={handlePostDelete} />
                    </Grid>
                ))}
            </Grid>
            */}
        </Container>
    );
};

export default PostListPage;