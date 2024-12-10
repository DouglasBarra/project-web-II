'use client'

import { useState } from 'react';
import { useProfissional } from '@/hooks/useProfissionais';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProfissinaisTable from '@/components/gesto/profissionais/ProfissionaisTable';
import ProfissionaisForm from '@/components/gesto/profissionais/ProfissionaisForm';

const ProfissionalPage = () => {
    const { profissional, addProfissional, updateProfissional, removeProfissional } = useProfissional();
    const [ selectedProfissional, setSelectedProfissional ] = useState(null);
    const [ openDialog, setOpenDialog] = useState(false);

    // Quando clica em uma linha da tabela (editar aluno)
    const handleRowClick = (profissional) => {
        setSelectedProfissional(profissional);   // Define o aluno selecionado
        setOpenDialog(true);       // Abre o diálogo de edição
    };

    // Atualiza o estado de um campo no formulário (criação/edição)
    const handleFormChange = (field, value) => {
        setSelectedProfissional((prev) => ({ ...prev, [field]: value }));
    };

    // Submete o formulário (criação ou edição de aluno)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedProfissional?._id) {
            updateProfissional(selectedProfissional._id, selectedProfissional);  // Atualiza aluno existente
        } else {
            addProfissional(selectedProfissional);  // Cria um novo aluno
        }
        setOpenDialog(false);  // Fecha o diálogo após o envio
    };

    // Exclui um aluno
    const handleDelete = () => {
        if (selectedProfissional) {
            removeProfissional(selectedProfissional._id);
            setOpenDialog(false); // Fecha o diálogo após a exclusão
        }
    };

    // Função para abrir o formulário de criação de novo aluno
    const handleAddAluno = () => {
        setSelectedProfissional(null);  // Limpa o aluno selecionado, para garantir que será um novo aluno
        setOpenDialog(true);     // Abre o diálogo para criação
    };

    return (
        <div className="w-full h-full flex justify-center items-start p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <Button variant="outline"><Link href='/gesto/dashboard'>Voltar</Link></Button>
                    <h1>Gestão de Profissionais</h1>
                    <Button onClick={handleAddAluno}>Adicionar Profissional</Button>
                </div>
                <ProfissinaisTable Profissionais={profissional} onRowClick={handleRowClick} selectedProfissionalId={selectedProfissional?._id} />
            </div>

            {openDialog && (
                <Dialog open={openDialog} onOpenChange={(open) => !open && setOpenDialog(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{selectedProfissional?._id ? 'Editar Profissional' : 'Criar Novo Profissional'}</DialogTitle>
                        </DialogHeader>
                        <ProfissionaisForm
                            profissional={selectedProfissional || {}}  // Se não houver aluno selecionado, cria um novo
                            onChange={handleFormChange}
                            onDelete={handleDelete}
                            onSubmit={handleFormSubmit}
                            onCancel={() => setOpenDialog(false)}  // Função para cancelar e fechar o diálogo
                            newProfissional={selectedProfissional?._id ? true : false}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ProfissionalPage;
