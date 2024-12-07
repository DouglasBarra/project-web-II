'use client'

import { useState } from 'react';
import { useAlunos } from '@/hooks/useAlunos';
import AlunosTable from '@/components/gesto/aluno/AlunoTable';
import AlunoForm from '@/components/gesto/aluno/ALunoForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AlunosPage = () => {
    const { alunos, addAluno, updateAluno, removeAluno } = useAlunos();
    const [selectedAluno, setSelectedAluno] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    // Quando clica em uma linha da tabela (editar aluno)
    const handleRowClick = (aluno) => {
        setSelectedAluno(aluno);   // Define o aluno selecionado
        setOpenDialog(true);       // Abre o diálogo de edição
    };

    // Atualiza o estado de um campo no formulário (criação/edição)
    const handleFormChange = (field, value) => {
        setSelectedAluno((prev) => ({ ...prev, [field]: value }));
    };

    // Submete o formulário (criação ou edição de aluno)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedAluno?._id) {
            updateAluno(selectedAluno._id, selectedAluno);  // Atualiza aluno existente
        } else {
            addAluno(selectedAluno);  // Cria um novo aluno
        }
        setOpenDialog(false);  // Fecha o diálogo após o envio
    };

    // Exclui um aluno
    const handleDelete = () => {
        if (selectedAluno) {
            removeAluno(selectedAluno._id);
            setOpenDialog(false); // Fecha o diálogo após a exclusão
        }
    };

    // Função para abrir o formulário de criação de novo aluno
    const handleAddAluno = () => {
        setSelectedAluno(null);  // Limpa o aluno selecionado, para garantir que será um novo aluno
        setOpenDialog(true);     // Abre o diálogo para criação
    };

    return (
        <div className="w-full h-full flex justify-center items-start p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <Button variant="outline"><Link href='/gesto/dashboard'>Voltar</Link></Button>
                    <h1>Gestão de Alunos</h1>
                    <Button onClick={handleAddAluno}>Adicionar Aluno</Button>
                </div>
                <AlunosTable alunos={alunos} onRowClick={handleRowClick} selectedAlunoId={selectedAluno?._id} />
            </div>

            {openDialog && (
                <Dialog open={openDialog} onOpenChange={(open) => !open && setOpenDialog(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{selectedAluno?._id ? 'Editar Aluno' : 'Criar Novo Aluno'}</DialogTitle>
                        </DialogHeader>
                        <AlunoForm
                            aluno={selectedAluno || {}}  // Se não houver aluno selecionado, cria um novo
                            onChange={handleFormChange}
                            onDelete={handleDelete}
                            onSubmit={handleFormSubmit}
                            onCancel={() => setOpenDialog(false)}  // Função para cancelar e fechar o diálogo
                            newAluno={selectedAluno?._id ? true : false}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default AlunosPage;
