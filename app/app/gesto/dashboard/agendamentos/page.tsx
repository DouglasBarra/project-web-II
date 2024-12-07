'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAgendamentos } from '@/hooks/useAgendamentos';
import AgendamentosTable from '@/components/gesto/agendamentos/AgendamentosTable';
import AgendamentoForm from '@/components/gesto/agendamentos/AgendamentoForm';

const AgendamentosPage = () => {
    const { agendamentos, addAgendamento, updateAgendamento, removeAgendamento } = useAgendamentos();
    const [ selectedAgendamento, setSelectedAgendamento] = useState(null);
    const [ openDialog, setOpenDialog] = useState(false);

    // Quando clica em uma linha da tabela (editar aluno)
    const handleRowClick = (agendamento) => {
        setSelectedAgendamento(agendamento);   // Define o aluno selecionado
        setOpenDialog(true);       // Abre o diálogo de edição
    };

    // Atualiza o estado de um campo no formulário (criação/edição)
    const handleFormChange = (field, value) => {
        setSelectedAgendamento((prev) => ({ ...prev, [field]: value }));
    };

    // Submete o formulário (criação ou edição de aluno)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedAgendamento?._id) {
            updateAgendamento(selectedAgendamento._id, selectedAgendamento);  // Atualiza aluno existente
        } else {
            addAgendamento(selectedAgendamento);  // Cria um novo aluno
        }
        setOpenDialog(false);  // Fecha o diálogo após o envio
    };

    // Exclui um aluno
    const handleDelete = () => {
        if (selectedAgendamento) {
            removeAgendamento(selectedAgendamento._id);
            setOpenDialog(false); // Fecha o diálogo após a exclusão
        }
    };

    // Função para abrir o formulário de criação de novo aluno
    const handleAddAluno = () => {
        setSelectedAgendamento(null);  // Limpa o aluno selecionado, para garantir que será um novo aluno
        setOpenDialog(true);     // Abre o diálogo para criação
    };

    return (
        <div className="w-full h-full flex justify-center items-start p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <Button variant="outline"><Link href='/gesto/dashboard'>Voltar</Link></Button>
                    <h1>Agendamentos</h1>
                    <Button onClick={handleAddAluno}>Adicionar Agendamento</Button>
                </div>
                <AgendamentosTable Agendamentos={agendamentos} onRowClick={handleRowClick} selectedAgendamentoId={selectedAgendamento?._id} />
            </div>

            {openDialog && (
                <Dialog open={openDialog} onOpenChange={(open) => !open && setOpenDialog(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{selectedAgendamento?._id ? 'Editar Agendamento' : 'Criar Novo agendamento'}</DialogTitle>
                        </DialogHeader>
                        <AgendamentoForm
                            agendamento={selectedAgendamento || {}}  // Se não houver aluno selecionado, cria um novo
                            onChange={handleFormChange}
                            onDelete={handleDelete}
                            onSubmit={handleFormSubmit}
                            onCancel={() => setOpenDialog(false)}  // Função para cancelar e fechar o diálogo
                            newAgendamento={selectedAgendamento?._id ? true : false}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default AgendamentosPage;
