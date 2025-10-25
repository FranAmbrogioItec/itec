import React, { useState, useEffect } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, CircularProgress, Alert, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

// 🚨 ASUMIDO: Debes reemplazar estos placeholders con las funciones API reales:
// - getAllUsers: Llama a GET /api/users
// - updateUserRole: Llama a PUT /api/users/<id>
const mockUsers = [
    { id: 1, username: 'AdminMaster', email: 'admin@app.com', role: 'admin' },
    { id: 2, username: 'ModeradorXYZ', email: 'mod@app.com', role: 'moderator' },
    { id: 3, username: 'UsuarioFran', email: 'user@app.com', role: 'user' },
];
const getAllUsers = async () => new Promise(resolve => setTimeout(() => resolve(mockUsers), 800));
const updateUserRole = async (userId, newRole) => new Promise(resolve => setTimeout(() => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) user.role = newRole;
    resolve({ message: 'Rol actualizado', user });
}, 500));

const ALLOWED_ROLES = ['user', 'moderator', 'admin'];

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingUserId, setUpdatingUserId] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    // Carga inicial de usuarios
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllUsers(); 
            setUsers(data);
        } catch (err) {
            setError('Error al cargar la lista de usuarios. Verifica el endpoint GET /api/users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Maneja la actualización del rol
    const handleRoleChange = async (userId, newRole) => {
        setUpdatingUserId(userId);
        try {
            const response = await updateUserRole(userId, newRole); 
            
            // Actualiza el estado local con el nuevo rol
            setUsers(prevUsers => 
                prevUsers.map(u => u.id === userId ? { ...u, role: newRole } : u)
            );
            
            enqueueSnackbar(`Rol de ${response.user.username} actualizado a ${newRole}.`, { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Fallo al actualizar el rol. El backend devolvió un error.', { variant: 'error' });
        } finally {
            setUpdatingUserId(null);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Lista de Usuarios Registrados</Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rol Actual</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        size="small"
                                        disabled={updatingUserId === user.id}
                                    >
                                        {ALLOWED_ROLES.map(role => (
                                            <MenuItem key={role} value={role}>{role.toUpperCase()}</MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button color="error" size="small" disabled={updatingUserId === user.id}>
                                        Eliminar
                                    </Button>
                                    {updatingUserId === user.id && <CircularProgress size={20} sx={{ ml: 1 }} />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserManagement;