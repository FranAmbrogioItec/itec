import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';
import { Container, Box, Typography, TextField, Button, CircularProgress, Select, MenuItem, InputLabel, FormControl, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';

const RegisterPage = () => {
    // Definimos el estado inicial
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user', // <--- MANTENER EL ROL FIJO PARA REGISTROS PÚBLICOS
    });
    const [validationErrors, setValidationErrors] = useState({}); // Nuevo estado para errores de validación local
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
        setValidationErrors({ ...validationErrors, [e.target.name]: '' }); // Limpia el error al escribir
    };
    
    // Función de validación local (CRÍTICA para evitar el 400 por campos vacíos)
    const validate = () => {
        const errors = {};
        if (!formData.username.trim()) errors.username = 'El nombre de usuario es requerido.';
        if (!formData.email.trim()) errors.email = 'El email es requerido.';
        if (!formData.password.trim()) errors.password = 'La contraseña es requerida.';
        
        // Puedes añadir aquí validaciones de formato (ej: email válido, longitud de contraseña)
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) {
            enqueueSnackbar('Por favor, completa todos los campos requeridos.', { variant: 'warning' });
            return;
        }

        setIsSubmitting(true);

        try {
            // Se envía el JSON completo, incluyendo el rol fijo 'user'.
            await registerUser(formData);
            
            enqueueSnackbar('Registro exitoso. ¡Ahora puedes iniciar sesión!', { variant: 'success' });
            navigate('/login'); // Redirigir al login
        } catch (error) {
            // El error incluye el mensaje de Flask (ej: email duplicado, validación de Marshmallow)
            // NOTA: Si la API devuelve un mensaje de error detallado de Marshmallow,
            // podrías usarlo aquí: const errorMessage = error.response?.data?.message || 'Error...';
            const errorMessage = error.message || 'Error al registrar el usuario. El email o username pueden estar duplicados.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
            // Mostrar el error globalmente si es un error del servidor
            setValidationErrors({ server: errorMessage }); 
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Registro de Usuario
                </Typography>
                {validationErrors.server && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{validationErrors.server}</Alert>}
                
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    
                    {/* Campo Username */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Nombre de Usuario"
                        name="username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                        error={!!validationErrors.username}
                        helperText={validationErrors.username}
                    />
                    
                    {/* Campo Email */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!validationErrors.email}
                        helperText={validationErrors.email}
                    />

                    {/* Campo Password */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!validationErrors.password}
                        helperText={validationErrors.password}
                    />

                    {/* ❌ REMOVIDO: Eliminado el selector de rol para registro público. */}
                    {/* El rol se envía automáticamente como 'user' en formData.role */}
                    
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