// hooks/useAlunos.ts
import { useState, useEffect } from 'react';
import { getAllAlunos, createAluno, editAluno, deleteAluno } from '@/services/alunos';

export const useAlunos = () => {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchAlunos = async () => {
        setLoading(true);
        try {
            const data = await getAllAlunos();
            setAlunos(data);
        } catch (err) {
            setError("Erro ao carregar alunos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlunos();
    }, []);

    const addAluno = async (newAluno) => {
        try {
            await createAluno(newAluno);
            fetchAlunos();
        } catch (err) {
            setError('Erro ao adicionar aluno');
        }
    };

    const updateAluno = async (id, aluno) => {
        try {
            await editAluno(id, aluno);
            fetchAlunos();
        } catch (err) {
            setError('Erro ao editar aluno');
        }
    };

    const removeAluno = async (id) => {
        try {
            await deleteAluno(id);
            fetchAlunos();
        } catch (err) {
            setError('Erro ao excluir aluno');
        }
    };

    return {
        alunos,
        loading,
        error,
        addAluno,
        updateAluno,
        removeAluno,
        fetchAlunos,
    };
};
