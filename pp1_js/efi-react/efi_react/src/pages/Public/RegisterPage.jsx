import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';
import { Container, Box, Typography, TextField, Button, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useSnackbar } from 'notistack';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user', // Valor por defecto
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    if (isLoggedIn) {
        navigate('/');
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await registerUser(formData);
            
            enqueueSnackbar('Registro exitoso. ¡Ahora puedes iniciar sesión!', { variant: 'success' });
            navigate('/login'); // Redirigir al login
        } catch (error) {
            // El error incluye el mensaje de Flask (ej: email duplicado, validación)
            const errorMessage = error.message || 'Error al registrar el usuario.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Registrarse
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    {/* Campo de Nombre/Username */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nombre de Usuario"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    {/* Campo de Email */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {/* Campo de Contraseña */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {/* Campo de Rol (Menú Desplegable) - Requisito 1 */}
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="role-label">Rol</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={formData.role}
                            label="Rol"
                            onChange={handleChange}
                        >
                            <MenuItem value="user">Usuario (user)</MenuItem>
                            <MenuItem value="moderator">Moderador (moderator)</MenuItem>
                            <MenuItem value="admin">Administrador (admin)</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default RegisterPage;