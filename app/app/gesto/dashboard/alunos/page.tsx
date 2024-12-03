'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { editAluno, getAllAlunos, deleteAluno, createAluno } from '@/services/alunos'; // Assuming createAluno exists
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AlunosPage = () => {
    const [alunos, setAlunos] = useState([]);
    const [selectedAluno, setSelectedAluno] = useState(null);
    const [reload, setReload] = useState(false);
    const [newAluno, setNewAluno] = useState({ name: '', age: '', parents: '', phoneNumber: '', specialNeeds: '', status: 'off' });
    const [openCreateDialog, setOpenCreateDialog] = useState(false);  // Estado para controlar o diálogo de criação

    useEffect(() => {
        getAllAlunos()
            .then((data) => {
                if (data) {
                    setAlunos(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [reload]);

    const handleRowClick = (aluno) => {
        setSelectedAluno(aluno);
    };

    const handleInputChange = (field, value, isNew = false) => {
        if (isNew) {
            setNewAluno((prev) => ({
                ...prev,
                [field]: value,
            }));
        } else {
            setSelectedAluno((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleEditAluno = () => {
        if (!selectedAluno) return;
        console.log("Editar aluno", selectedAluno);

        editAluno(selectedAluno._id, selectedAluno)
            .then((data) => {
                if (data) {
                    setReload((prev) => !prev);  
                    setSelectedAluno(null); 
                }
            })
            .catch((error) => {
                console.error("Erro ao editar aluno:", error);
            });
    };

    const handleDeleteAluno = () => {
        if (!selectedAluno) return;
        deleteAluno(selectedAluno._id)
            .then(() => {
                setReload((prev) => !prev);  
                setSelectedAluno(null);
            })
            .catch((error) => {
                console.error("Erro ao excluir aluno:", error);
            });
    };

    const handleCreateAluno = () => {
        createAluno(newAluno)
            .then((data) => {
                if (data) {
                    setReload((prev) => !prev);
                    setOpenCreateDialog(false); 
                    setNewAluno({ name: '', age: '', parents: '', phoneNumber: '', specialNeeds: '', status: 'off' });
                }
            })
            .catch((error) => {
                console.error("Erro ao criar aluno:", error);
            });
    };

    const handleAddAluno = () => {
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
                        onClick={handleAddAluno}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Adicionar Aluno
                    </Button>
                    <h1 className="text-3xl font-bold text-left">Alunos</h1>
                </div>

                <Table className="min-w-full table-auto">
                    <TableCaption>A lista de alunos cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead hidden>id</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Idade</TableHead>
                            <TableHead>Pais</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Caracteristica</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {alunos.map((aluno) => (
                            <TableRow
                                key={aluno._id}
                                className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedAluno?._id === aluno._id ? 'bg-blue-300' : ''}`}
                                onClick={() => handleRowClick(aluno)}
                            >
                                <TableCell hidden>{aluno._id}</TableCell>
                                <TableCell>{aluno.name}</TableCell>
                                <TableCell>{aluno.age}</TableCell>
                                <TableCell>{aluno.parents}</TableCell>
                                <TableCell>{aluno.phoneNumber}</TableCell>
                                <TableCell>{aluno.specialNeeds}</TableCell>
                                <TableCell className="text-right">
                                    <Checkbox
                                        className="m-3"
                                        checked={aluno.status === 'on'}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {selectedAluno && (
                <Dialog open={Boolean(selectedAluno)} onOpenChange={(open) => !open && setSelectedAluno(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar Aluno</DialogTitle>
                            <DialogDescription>
                                Faça alterações no perfil do aluno selecionado.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {['name', 'age', 'parents', 'phoneNumber', 'specialNeeds'].map((field) => (
                                <div className="grid grid-cols-4 items-center gap-4" key={field}>
                                    <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        value={selectedAluno[field] || ''}
                                        onChange={(e) => handleInputChange(field, e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                            ))}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">Status</Label>
                                <Checkbox
                                    id="status"
                                    value={selectedAluno.status === 'on'}
                                    onChange={(e) => handleInputChange('status', e.target.checked ? 'on' : 'off')}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="destructive" onClick={handleDeleteAluno}>Excluir Aluno</Button>
                            <Button onClick={handleEditAluno}>Salvar alterações</Button>
                            <Button variant="outline" onClick={() => setSelectedAluno(null)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {openCreateDialog && (
                <Dialog open={openCreateDialog} onOpenChange={(open) => !open && setOpenCreateDialog(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Criar Novo Aluno</DialogTitle>
                            <DialogDescription>
                                Preencha as informações para adicionar um novo aluno.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {['name', 'age', 'parents', 'phoneNumber', 'specialNeeds'].map((field) => (
                                <div className="grid grid-cols-4 items-center gap-4" key={field}>
                                    <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        value={newAluno[field] || ''}
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
                            <Button onClick={handleCreateAluno}>Adicionar Aluno</Button>
                            <Button variant="outline" onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default AlunosPage;
