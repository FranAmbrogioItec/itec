import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../context/AuthContext';
import { deleteReview } from '../../api/reviewsApi';
import { useSnackbar } from 'notistack';

const ReviewList = ({ reviews, setReviews }) => {
    const { user, hasRole } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    // Requisito 3: Verifica si el usuario puede eliminar el comentario
    const canDeleteReview = (review) => {
        if (!user) return false;
        
        const isOwner = user.id === review.author.id;
        // Según la lógica de tu backend, el moderador/admin también puede eliminar comentarios.
        const isPrivileged = hasRole(['moderator', 'admin']); 
        
        return isOwner || isPrivileged;
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) return;

        try {
            await deleteReview(reviewId);
            
            // Actualiza el estado local para eliminar el comentario sin recargar
            setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
            
            enqueueSnackbar('Comentario eliminado exitosamente.', { variant: 'success' });
        } catch (error) {
            const message = error.message || 'Error de permisos o el comentario no existe.';
            enqueueSnackbar(message, { variant: 'error' });
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Comentarios ({reviews.length})
            </Typography>
            <List>
                {reviews.length === 0 ? (
                    <Typography color="text.secondary">Aún no hay comentarios. ¡Sé el primero!</Typography>
                ) : (
                    reviews.map((review, index) => (
                        <React.Fragment key={review.id}>
                            <ListItem 
                                alignItems="flex-start"
                                secondaryAction={
                                    canDeleteReview(review) && (
                                        <IconButton edge="end" aria-label="delete" color="error" onClick={() => handleDelete(review.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    )
                                }
                            >
                                <ListItemText
                                    primary={review.text}
                                    secondary={
                                        <Typography component="span" variant="body2" color="text.primary">
                                            **{review.author.username}**{' '}
                                            <Typography component="span" variant="caption" color="text.secondary">
                                                - {new Date(review.created_at).toLocaleString()}
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {index < reviews.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))
                )}
            </List>
        </Box>
    );
};

export default ReviewList;