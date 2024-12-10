'use client'

import { use, useState } from 'react';
import { useUsuario } from '@/hooks/useUsuarios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import UsuarioTable from '@/components/gesto/usuarios/UsuariosTable';
import UsuarioForm from '@/components/gesto/usuarios/UsuariosForm';

const UsuarioPage = () => {
    const { usuario, addUsuario, updateUsuario, removeUsuario } = useUsuario();
    const [ selectedUsuario, setSelectedUsuario ] = useState(null);
    const [ openDialog, setOpenDialog] = useState(false);

    // Quando clica em uma linha da tabela (editar aluno)
    const handleRowClick = (usuario) => {
        setSelectedUsuario(usuario);   // Define o aluno selecionado
        setOpenDialog(true);       // Abre o diálogo de edição
    };

    // Atualiza o estado de um campo no formulário (criação/edição)
    const handleFormChange = (field, value) => {
        setSelectedUsuario((prev) => ({ ...prev, [field]: value }));
    };

    // Submete o formulário (criação ou edição de aluno)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedUsuario?._id) {
            updateUsuario(selectedUsuario._id, selectedUsuario);  // Atualiza aluno existente
        } else {
            addUsuario(selectedUsuario);  // Cria um novo aluno
        }
        setOpenDialog(false);  // Fecha o diálogo após o envio
    };

    // Exclui um aluno
    const handleDelete = () => {
        if (selectedUsuario) {
            removeUsuario(selectedUsuario._id);
            setOpenDialog(false); // Fecha o diálogo após a exclusão
        }
    };

    // Função para abrir o formulário de criação de novo aluno
    const handleAddAluno = () => {
        setSelectedUsuario(null);  // Limpa o aluno selecionado, para garantir que será um novo aluno
        setOpenDialog(true);     // Abre o diálogo para criação
    };

    return (
        <div className="w-full h-full flex justify-center items-start p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <Button variant="outline"><Link href='/gesto/dashboard'>Voltar</Link></Button>
                    <h1>Gestão de Usuários</h1>
                    <Button onClick={handleAddAluno}>Adicionar Usuário</Button>
                </div>
                <UsuarioTable Usuarios={usuario} onRowClick={handleRowClick} selectedUsuarioId={selectedUsuario?._id} />
            </div>

            {openDialog && (
                <Dialog open={openDialog} onOpenChange={(open) => !open && setOpenDialog(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{selectedUsuario?._id ? 'Editar Usuário' : 'Criar Novo Usuário'}</DialogTitle>
                        </DialogHeader>
                        <UsuarioForm
                            usuario={selectedUsuario || {}}  // Se não houver aluno selecionado, cria um novo
                            onChange={handleFormChange}
                            onDelete={handleDelete}
                            onSubmit={handleFormSubmit}
                            onCancel={() => setOpenDialog(false)}  // Função para cancelar e fechar o diálogo
                            newUsuario={selectedUsuario?._id ? true : false}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default UsuarioPage;
