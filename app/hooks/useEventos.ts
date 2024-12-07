import { useState, useEffect } from 'react';
import { createEvento, deleteEvento, editEvento, getAllEventos } from '@/services/eventos';

export const useEventos = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchEventos = async () => {
        setLoading(true);
        try {
            const data = await getAllEventos();
            setEventos(data);
        } catch (err) {
            setError("Erro ao carregar os eventos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    const addEvento = async (newEvento) => {
        try {
            await createEvento(newEvento);
            fetchEventos();
        } catch (err) {
            setError('Erro ao adicionar evento');
        }
    };

    const updateEvento = async (id, evento) => {
        try {
            await editEvento(id, evento);
            fetchEventos();
        } catch (err) {
            setError('Erro ao editar evento');
        }
    };

    const removeEvento = async (id) => {
        try {
            await deleteEvento(id);
            fetchEventos();
        } catch (err) {
            setError('Erro ao excluir evento');
        }
    };

    return {
        eventos,
        loading,
        error,
        addEvento,
        updateEvento,
        removeEvento,
        fetchEventos,
    };
};
