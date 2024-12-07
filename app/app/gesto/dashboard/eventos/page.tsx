'use client'

import { useState } from 'react';
import { useEventos } from '@/hooks/useEventos';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EventoTable from '@/components/gesto/evento/EventoTable';
import EventoForm from '@/components/gesto/evento/EventoForm';

const EventosPage = () => {
    const { eventos, addEvento, updateEvento, removeEvento } = useEventos();
    const [selectedEvento, setSelectedEvento] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    // Quando clica em uma linha da tabela (editar aluno)
    const handleRowClick = (evento) => {
        setSelectedEvento(evento);   // Define o aluno selecionado
        setOpenDialog(true);       // Abre o diálogo de edição
    };

    // Atualiza o estado de um campo no formulário (criação/edição)
    const handleFormChange = (field, value) => {
        setSelectedEvento((prev) => ({ ...prev, [field]: value }));
    };

    // Submete o formulário (criação ou edição de aluno)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedEvento?._id) {
            updateEvento(selectedEvento._id, selectedEvento);  // Atualiza aluno existente
        } else {
            addEvento(selectedEvento);  // Cria um novo aluno
        }
        setOpenDialog(false);  // Fecha o diálogo após o envio
    };

    // Exclui um aluno
    const handleDelete = () => {
        if (selectedEvento) {
            removeEvento(selectedEvento._id);
            setOpenDialog(false); // Fecha o diálogo após a exclusão
        }
    };

    // Função para abrir o formulário de criação de novo aluno
    const handleAddAluno = () => {
        setSelectedEvento(null);  // Limpa o aluno selecionado, para garantir que será um novo aluno
        setOpenDialog(true);     // Abre o diálogo para criação
    };

    return (
        <div className="w-full h-full flex justify-center items-start p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <Button variant="outline"><Link href='/gesto/dashboard'>Voltar</Link></Button>
                    <h1>Gestão de Eventos</h1>
                    <Button onClick={handleAddAluno}>Adicionar Evento</Button>
                </div>
                <EventoTable Eventos={eventos} onRowClick={handleRowClick} selectedEventoId={selectedEvento?._id} />
            </div>

            {openDialog && (
                <Dialog open={openDialog} onOpenChange={(open) => !open && setOpenDialog(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{selectedEvento?._id ? 'Editar Evento' : 'Criar Novo Evento'}</DialogTitle>
                        </DialogHeader>
                        <EventoForm
                            evento={selectedEvento || {}}  // Se não houver aluno selecionado, cria um novo
                            onChange={handleFormChange}
                            onDelete={handleDelete}
                            onSubmit={handleFormSubmit}
                            onCancel={() => setOpenDialog(false)}  // Função para cancelar e fechar o diálogo
                            newEvento={selectedEvento?._id ? true : false}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default EventosPage;
