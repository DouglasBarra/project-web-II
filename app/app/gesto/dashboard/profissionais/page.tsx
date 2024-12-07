'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { editProfissional, getAllProfissionais, deleteProfissional, createProfissional } from '@/services/profissionais'; // Assuming createAluno exists
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ProfissionaisPage = () => {
    const [profissionais, setProfissionais] = useState([]);
    const [selectedProfissional, setSelectedProfissional] = useState(null);
    const [reload, setReload] = useState(false);
    const [newProfissional, setNewProfissional] = useState({ name: '', specialty: '', contact: '', phoneNumber: '', status: 'off' });
    const [openCreateDialog, setOpenCreateDialog] = useState(false);  // Estado para controlar o diálogo de criação

    useEffect(() => {
        getAllProfissionais()
            .then((data) => {
                if (data) {
                    setProfissionais(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [reload]);

    const handleRowClick = (profissional) => {
        setSelectedProfissional(profissional);
    };

    const handleInputChange = (field, value, isNew = false) => {
        if (isNew) {
            setNewProfissional((prev) => ({
                ...prev,
                [field]: value,
            }));
        } else {
            setSelectedProfissional((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleEditProfissional = () => {
        if (!selectedProfissional) return;
        console.log("Editar profissional", selectedProfissional);

        editProfissional(selectedProfissional._id, selectedProfissional)
            .then((data) => {
                if (data) {
                    setReload((prev) => !prev);  
                    setSelectedProfissional(null); 
                }
            })
            .catch((error) => {
                console.error("Erro ao editar profissional:", error);
            });
    };

    const handleDeleteProfissional = () => {
        if (!selectedProfissional) return;
        deleteProfissional(selectedProfissional._id)
            .then(() => {
                setReload((prev) => !prev);  
                setSelectedProfissional(null);
            })
            .catch((error) => {
                console.error("Erro ao excluir profissional:", error);
            });
    };

    const handleCreateProfissional = () => {
        createProfissional(newProfissional)
            .then((data) => {
                if (data) {
                    setReload((prev) => !prev);
                    setOpenCreateDialog(false); 
                    setNewProfissional({ name: '', specialty: '', contact: '', phoneNumber: '', status: 'off' });
                }
            })
            .catch((error) => {
                console.error("Erro ao criar profissional:", error);
            });
    };

    const handleAddProfissional = () => {
        setOpenCreateDialog(true);  // Abre o diálogo de criação
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
                        onClick={handleAddProfissional}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Adicionar Profissional
                    </Button>
                    <h1 className="text-3xl font-bold text-left">Profissionais</h1>
                </div>

                <Table className="min-w-full table-auto">
                    <TableCaption>A lista de profissionais cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead hidden>id</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Especialidade</TableHead>
                            <TableHead>Contato</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {profissionais.map((profissional) => (
                            <TableRow
                                key={profissional._id}
                                className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedProfissional?._id === profissional._id ? 'bg-blue-300' : ''}`}
                                onClick={() => handleRowClick(profissional)}
                            >
                                <TableCell hidden>{profissional._id}</TableCell>
                                <TableCell>{profissional.name}</TableCell>
                                <TableCell>{profissional.specialty}</TableCell>
                                <TableCell>{profissional.contact}</TableCell>
                                <TableCell>{profissional.phoneNumber}</TableCell>
                                <TableCell className="text-right">
                                    <Checkbox
                                        className="m-3"
                                        checked={profissional.status === 'on'}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {selectedProfissional && (
                <Dialog open={Boolean(selectedProfissional)} onOpenChange={(open) => !open && setSelectedProfissional(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar Profissional</DialogTitle>
                            <DialogDescription>
                                Faça alterações no perfil do profissional selecionado.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {['name', 'specialty', 'contact', 'phoneNumber'].map((field) => (
                                <div className="grid grid-cols-4 items-center gap-4" key={field}>
                                    <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        value={selectedProfissional[field] || ''}
                                        onChange={(e) => handleInputChange(field, e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                            ))}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">Status</Label>
                                <Checkbox
                                    id="status"
                                    value={selectedProfissional.status === 'on'}
                                    onChange={(e) => handleInputChange('status', e.target.checked ? 'on' : 'off')}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="destructive" onClick={handleDeleteProfissional}>Excluir Profissional</Button>
                            <Button onClick={handleEditProfissional}>Salvar alterações</Button>
                            <Button variant="outline" onClick={() => setSelectedProfissional(null)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {openCreateDialog && (
                <Dialog open={openCreateDialog} onOpenChange={(open) => !open && setOpenCreateDialog(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Criar Novo Profissional</DialogTitle>
                            <DialogDescription>
                                Preencha as informações para adicionar um novo profissional.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {['name', 'specialty', 'contact', 'phoneNumber'].map((field) => (
                                <div className="grid grid-cols-4 items-center gap-4" key={field}>
                                    <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        value={newProfissional[field] || ''}
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
                            <Button onClick={handleCreateProfissional}>Adicionar Profissional</Button>
                            <Button variant="outline" onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ProfissionaisPage;
