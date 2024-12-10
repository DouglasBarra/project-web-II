import { useState, useEffect } from 'react';
import { createProfessor, deleteProfessor, editProfessor, getAllProfessores } from '@/services/professores';

export const useProfessores = () => {
    const [professores, setProfessores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchProfessores = async () => {
        setLoading(true);
        try {
            const data = await getAllProfessores();
            setProfessores(data);
        } catch (err) {
            setError("Erro ao carregar os Professores");
            createProfessor  } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfessores();
    }, []);

    const addProfessores = async (newProfessores) => {
        try {
            await createProfessor(newProfessores);
            fetchProfessores();
        } catch (err) {
            setError('Erro ao adicionar Professores');
        }
    };

    const updateProfessores = async (id, professores) => {
        try {
            await editProfessor(id, professores);
            fetchProfessores();
        } catch (err) {
            setError('Erro ao editar professores');
        }
    };

    const removeProfessor = async (id) => {
        try {
            await deleteProfessor(id);
            fetchProfessores();
        } catch (err) {
            setError('Erro ao excluir professores');
        }
    };

    return {
        professores,
        loading,
        error,
        addProfessores,
        updateProfessores,
        removeProfessor,
        fetchProfessores,
    };
};