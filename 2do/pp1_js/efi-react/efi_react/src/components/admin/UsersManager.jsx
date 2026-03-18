import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Alert, Select, MenuItem, FormControl, Box} from '@mui/material';
import { getAllUsers, updateUserRole } from '../../api/adminApi';
import { useSnackbar } from 'notistack';

const UsersManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message || 'Fallo al cargar la lista de usuarios. Verifica el endpoint de Flask.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Manejador para cambiar el rol de un usuario
    const handleRoleChange = async (userId, newRole) => {
        setLoading(true);
        try {
            await updateUserRole(userId, newRole);
            enqueueSnackbar(`Rol de usuario ${userId} actualizado a ${newRole}.`, { variant: 'success' });
            // Refrescar la lista para mostrar el cambio
            fetchUsers();
        } catch (err) {
            enqueueSnackbar(`Error al cambiar el rol: ${err.message}`, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Gestión de Roles y Usuarios</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rol Actual</TableCell>
                            <TableCell>Cambiar Rol</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(users || []).map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <FormControl size="small">
                                        <Select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            sx={{ minWidth: 120 }}
                                        >
                                            <MenuItem value="user">User</MenuItem>
                                            <MenuItem value="moderator">Moderator</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UsersManager;