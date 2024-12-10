import { useState, useEffect } from 'react';
import { createUser, editUser, deleteUser, getAllUsers } from '@/services/usuarios';

export const useUsuario = () => {
    const [usuario, setUsuario] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchUsuario = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsuario(data);
        } catch (err) {
            setError("Erro ao carregar os Usuarios"); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuario();
    }, []);

    const addUsuario = async (newUser) => {
        try {
            await createUser(newUser);
            fetchUsuario();
        } catch (err) {
            setError('Erro ao adicionar usuario');
        }
    };

    const updateUsuario = async (id, profissional) => {
        try {
            await editUser(id, profissional);
            fetchUsuario();
        } catch (err) {
            setError('Erro ao editar usuario')
        };
    };
    const removeUsuario = async (id) => {
        try {
            await deleteUser(id);
            fetchUsuario();
        } catch (err) {
            setError('Erro ao excluir Profissionais');
        }
    };

    return {
        usuario,
        loading,
        error,
        addUsuario,
        updateUsuario,
        removeUsuario,
        fetchUsuario,
    };
}