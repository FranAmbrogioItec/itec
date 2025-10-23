import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';
import { createReview } from '../../api/reviewsApi';
import { useSnackbar } from 'notistack';

const ReviewForm = ({ postId, onReviewCreated }) => {
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) {
            enqueueSnackbar('El comentario no puede estar vacío.', { variant: 'warning' });
            return;
        }

        setIsSubmitting(true);
        try {
            // Llama a la API para crear el comentario
            const newReview = await createReview(postId, { text });
            
            // Notifica a la página padre que un nuevo comentario fue creado
            onReviewCreated(newReview); 
            
            enqueueSnackbar('Comentario publicado exitosamente.', { variant: 'success' });
            setText(''); // Limpia el formulario
        } catch (error) {
            const message = error.message || 'Error al publicar el comentario.';
            enqueueSnackbar(message, { variant: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Añadir un Comentario
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={3}
                label="Tu Comentario"
                value={text}
                onChange={(e) => setText(e.target.value)}
                variant="outlined"
                required
                sx={{ mb: 2 }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Publicar Comentario'}
            </Button>
        </Box>
    );
};

export default ReviewForm;