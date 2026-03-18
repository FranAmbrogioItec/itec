import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { deletePost } from '../../api/postsApi';
import { useSnackbar } from 'notistack';

const PostCard = ({ post, onDeleteSuccess }) => {
    const { user, hasRole } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    // Lógica para verificar si el usuario actual puede modificar el post.
    // Usuarios con rol 'user' solo pueden gestionar sus propios posts.
    // Roles 'admin' o 'moderator' pueden gestionar cualquier post (generalmente).
    const isPostOwner = user && user.id === post.author.id;
    const canEdit = isPostOwner || hasRole(['admin', 'moderator']);
    const canDelete = isPostOwner || hasRole(['admin']); // Limito Delete solo a autor y admin. 

    const handleDelete = async () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar el post: "${post.title}"?`)) {
            try {
                await deletePost(post.id);
                enqueueSnackbar('Post eliminado exitosamente.', { variant: 'success' });
                // Llama a la función de la página padre para refrescar la lista
                onDeleteSuccess(post.id); 
            } catch (error) {
                const message = error.message || 'No tienes permiso para eliminar este post.';
                enqueueSnackbar(message, { variant: 'error' });
            }
        }
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    <Link 
                        to={`/posts/${post.id}`} 
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        {post.title}
                    </Link>
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Por **{post.author.username}** el {new Date(post.created_at).toLocaleDateString()}
                    {post.category && 
                        ` en ${post.category.name}`
                    }
                </Typography>

                <Typography variant="body1">
                    {post.content.length > 200 
                        ? post.content.substring(0, 200) + '...' 
                        : post.content
                    }
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                    <Button size="small" component={Link} to={`/posts/${post.id}`} variant="outlined">
                        Leer más
                    </Button>
                    
                    {/* Botones de Gestión (Requisito 2) */}
                    {canEdit && (
                        <Button 
                            size="small" 
                            component={Link} 
                            to={`/posts/edit/${post.id}`} 
                            variant="text" 
                            color="warning" 
                            sx={{ ml: 1 }}
                        >
                            Editar
                        </Button>
                    )}
                    {canDelete && (
                        <Button 
                            size="small" 
                            onClick={handleDelete} 
                            variant="text" 
                            color="error" 
                            sx={{ ml: 1 }}
                        >
                            Eliminar
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostCard;    