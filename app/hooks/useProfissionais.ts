import { useState, useEffect } from 'react';
import { createProfissional, editProfissional, deleteProfissional, getAllProfissionais } from '@/services/profissionais';

export const useProfissional = () => {
    const [profissional, setProfissional] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchProfissionais = async () => {
        setLoading(true);
        try {
            const data = await getAllProfissionais();
            setProfissional(data);
        } catch (err) {
            setError("Erro ao carregar os Profissionais"); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfissionais();
    }, []);

    const addProfissional = async (newProfissional) => {
        try {
            await createProfissional(newProfissional);
            fetchProfissionais();
        } catch (err) {
            setError('Erro ao adicionar Profissionais');
        }
    };

    const updateProfissional = async (id, profissional) => {
        try {
            await editProfissional(id, profissional);
            fetchProfissionais();
        } catch (err) {
            setError('Erro ao editar Profissionais');
        }
    };

    const removeProfissional = async (id) => {
        try {
            await deleteProfissional(id);
            fetchProfissionais();
        } catch (err) {
            setError('Erro ao excluir Profissionais');
        }
    };

    return {
        profissional,
        loading,
        error,
        addProfissional,
        updateProfissional,
        removeProfissional,
        fetchProfissionais,
    };
};