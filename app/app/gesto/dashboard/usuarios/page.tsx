'use client'

import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { editUsuario, getAllUsuarios, deleteUsuario, createUsuario } from '@/services/usuariostela';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const UsuariosPage = () => {
const [usuarios, setUsuarios] = useState([]);
const [selectedUsuario, setSelectedUsuario] = useState(null);
const [reload, setReload] = useState(false);
const [newUsuario, setNewUsuario] = useState({ 'Nome': '', 'E-mail': '', 'Usuario': '', 'Senha': '', 'Level': '', 'Status': 'off' });
const [openCreateDialog, setOpenCreateDialog] = useState(false);

    useEffect(() => {
        getAllUsuarios()
            .then((data) => {
                if (data) {
                    setUsuarios(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [reload]);

    const handleRowClick = (usuario) => {
        setSelectedUsuario(usuario);
    };

    const handleInputChange = (field, value, isNew = false) =>{
        if (isNew) {
            setNewUsuario((prev) => ({
                ...prev,
                [field]: value,
            }));
        } else {
            setSelectedUsuario((prev) => ({
                ...prev,
                [field]: value,
            }))
        }
    };



    const handleEditUsuario = () => {
        console.log("Editar usuário", selectedUsuario);

        editUsuario(selectedUsuario.id, selectedUsuario)
            .then((data) => {
                if (data) {
                    setReload((prev) => !prev);
                    setSelectedUsuario(null);
                    }
                })
                .catch((error) => {
                    console.error("Erro ao editar usuario:", error);
                });
    };

    const handleDeleteUsuario = () => {
        if (!selectedUsuario) return;
        deleteUsuario(selectedUsuario._id)
            .then(() => {
                setReload((prev) => !prev);
                setSelectedUsuario(null);
            })
            .catch((error) => {
                console.error("Erro ao excluir usuario:", error);
            });
    };

    const handleCreateUsuario = () => {
        createUsuario(newUsuario)
            .then((data) => {
                if (data) {
                    setReload((prev) => !prev);
                    setOpenCreateDialog(false);
                    setNewUsuario({ 'Nome': '', 'E-mail': '', 'Usuario': '', 'Senha': '', 'Level': '', 'Status': 'off' })
                }
            })
            .catch((error) => {
                console.error("Erro ao criar aluno", error);
            });
    };

    const handleAddUsuario = () => {
        setOpenCreateDialog(true);
    };


    return (
        <div className="w-full h-full flex justify-center items-start p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <Button variant='outline'>
                        <Link href="/gesto/dashboard">
                            Voltar
                        </Link>
                    </Button>
                    <Button
                        onClick={handleAddUsuario}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Adicionar Usuário
                    </Button>
                    <h1 className="text-3xl font-bold text-left">Usuários</h1>
                </div>

                <Table className="min-w-full table-auto">
                    <TableCaption>A lista de usuários cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead hidden>id</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Usuário</TableHead>
                            <TableHead>Senha</TableHead>
                            <TableHead>Nivel</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usuarios.map((usuario) => (
                            <TableRow
                                key={usuario._id}
                                className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedUsuario?._id === usuario._id ? 'bg-blue-300' : ''}`}
                                onClick={() => handleRowClick(usuario)}
                            >
                                <TableCell hidden>{usuario._id}</TableCell>
                                <TableCell>{usuario.nome}</TableCell>
                                <TableCell>{usuario.E-mail}</TableCell>
                                <TableCell>{usuario.Usuário}</TableCell>
                                <TableCell>{usuario.Senha}</TableCell>
                                <TableCell>{usuario.Nivel}</TableCell>
                                <TableCell>{usuario.Status}</TableCell>
                                <TableCell className="text-right">
                                    <Checkbox 
                                    className="m-3" 
                                    checked={usuario.status === 'on'} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {selectedUsuario && (
                <Dialog open={Boolean(selectedUsuario)} onOpenChange={(open) => !open && setSelectedUsuario(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar Usuário</DialogTitle>
                            <DialogDescription>
                                Faça alterações no perfil do usuário selecionado.
                            
                                </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {['nome', 'e-mail', 'usuario', 'senha', 'level'].map((field) => (
                                <div className="grid grid-cols-4 items-center gap-4" key={field}>
                                    <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        value={selectedUsuario[field] || ''}
                                        onChange={(e) => handleInputChange(field, e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                            ))}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">Status</Label>
                                <Checkbox
                                    id="status"
                                    value={selectedUsuario.status === 'on'}
                                    onChange={(e) => handleInputChange('status', e.target.checked ? 'on' : 'off')}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="destructive" onClick={handleDeleteUsuario}>Excluir Usuario</Button>
                            <Button onClick={handleEditUsuario}>Salvar alterações</Button>
                            <Button variant="outline" onClick={() => setSelectedUsuario(null)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {openCreateDialog && (
                <Dialog open={openCreateDialog} onOpenChange={(open) => !open && setOpenCreateDialog(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Criar Novo Usuario</DialogTitle>
                            <DialogDescription>
                                Preencha as informações para adicionar um novo usuario.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {['nome', 'e-mail', 'usuario', 'senha', 'level'].map((field) => (
                                <div className="grid grid-cols-4 items-center gap-4" key={field}>
                                    <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        value={newUsuario[field] || ''}
                                        onChange={(e) => handleInputChange(field, e.target.value, true)}
                                        className="col-span-3"
                                    />
                                </div>
                            ))}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">Status</Label>
                                <Checkbox
                                    id="status"
                                    onChange={(e) => handleInputChange('status', e.target.checked ? 'on' : 'off', true)}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button onClick={handleCreateUsuario}>Adicionar Usuario</Button>
                            <Button variant="outline" onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default UsuariosPage;