'use client'

import { useState } from 'react';
import { useProfessores } from '@/hooks/useProfessores';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProfessoresTable from '@/components/gesto/professores/ProfessoresTable';
import ProfessoresForm from '@/components/gesto/professores/ProfessoresForm';

const ProfessoresPage = () => {
    const { professores, addProfessores, updateProfessores, removeProfessor } = useProfessores();
    const [ selectedProfessore, setSelectedProfessores ] = useState(null);
    const [ openDialog, setOpenDialog] = useState(false);

    // Quando clica em uma linha da tabela (editar aluno)
    const handleRowClick = (evento) => {
        setSelectedProfessores(evento);   // Define o aluno selecionado
        setOpenDialog(true);       // Abre o diálogo de edição
    };

    // Atualiza o estado de um campo no formulário (criação/edição)
    const handleFormChange = (field, value) => {
        setSelectedProfessores((prev) => ({ ...prev, [field]: value }));
    };

    // Submete o formulário (criação ou edição de aluno)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedProfessore?._id) {
            updateProfessores(selectedProfessore._id, selectedProfessore);  // Atualiza aluno existente
        } else {
            addProfessores(selectedProfessore);  // Cria um novo aluno
        }
        setOpenDialog(false);  // Fecha o diálogo após o envio
    };

    // Exclui um aluno
    const handleDelete = () => {
        if (selectedProfessore) {
            removeProfessor(selectedProfessore._id);
            setOpenDialog(false); // Fecha o diálogo após a exclusão
        }
    };

    // Função para abrir o formulário de criação de novo aluno
    const handleAddAluno = () => {
        setSelectedProfessores(null);  // Limpa o aluno selecionado, para garantir que será um novo aluno
        setOpenDialog(true);     // Abre o diálogo para criação
    };

    return (
        <div className="w-full h-full flex justify-center items-start p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <Button variant="outline"><Link href='/gesto/dashboard'>Voltar</Link></Button>
                    <h1>Gestão de Professores</h1>
                    <Button onClick={handleAddAluno}>Adicionar Professores</Button>
                </div>
                <ProfessoresTable Professores={professores} onRowClick={handleRowClick} selectedProfessoresId={selectedProfessore?._id} />
            </div>

            {openDialog && (
                <Dialog open={openDialog} onOpenChange={(open) => !open && setOpenDialog(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{selectedProfessore?._id ? 'Editar Professor' : 'Criar Novo Professores'}</DialogTitle>
                        </DialogHeader>
                        <ProfessoresForm
                            professor={selectedProfessore || {}}  // Se não houver aluno selecionado, cria um novo
                            onChange={handleFormChange}
                            onDelete={handleDelete}
                            onSubmit={handleFormSubmit}
                            onCancel={() => setOpenDialog(false)}  // Função para cancelar e fechar o diálogo
                            newProfessor={selectedProfessore?._id ? true : false}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ProfessoresPage;
