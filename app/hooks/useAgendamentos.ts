import { useState, useEffect } from 'react';
import { createAgendamento, deleteAgendamento, editAgendamento, getAllAgendamentos } from '@/services/agendamentos';

export const useAgendamentos = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchAgendamentos = async () => {
        setLoading(true);
        try {
            const data = await getAllAgendamentos();
            setAgendamentos(data);
        } catch (err) {
            setError("Erro ao carregar os Agendamentos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgendamentos();
    }, []);

    const addAgendamento = async (newAgendamento) => {
        try {
            await createAgendamento(newAgendamento);
            fetchAgendamentos();
        } catch (err) {
            setError('Erro ao adicionar agendamento');
        }
    };

    const updateAgendamento = async (id, agendamento) => {
        try {
            await editAgendamento(id, agendamento);
            fetchAgendamentos();
        } catch (err) {
            setError('Erro ao editar agendamento');
        }
    };

    const removeAgendamento = async (id) => {
        try {
            await deleteAgendamento(id);
            fetchAgendamentos();
        } catch (err) {
            setError('Erro ao excluir agendamento');
        }
    };

    return {
        agendamentos,
        loading,
        error,
        addAgendamento,
        updateAgendamento,
        removeAgendamento,
        fetchAgendamentos,
    };
};
