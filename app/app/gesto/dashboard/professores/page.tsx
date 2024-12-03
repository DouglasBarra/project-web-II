'use client'

import { useState, useEffect} from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { editProfessor, getAllProfessores, deleteProfessor, createProfessor } from '@/services/professores';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ProfessoresPage = () => {
    const [professores, setProfessores] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [reload, setReload] = useState(false);
    const [newProfessor, setNewProfessor] = useState({ name: '', schoolDisciplines: '', contact: '', phoneNumber: '', status: 'off' });
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    useEffect(() => {
        getAllProfessores()
            .then((data) => {
                if (data) {
                    setProfessores(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [reload]);

    const handleRowClick = (professor) => {
        setSelectedProfessor(professor);
    };

    const handleInputChange = (field, value, isNew = false) => {
        if (isNew) {
            setNewProfessor((prev) => ({
                ...prev,
                [field]: value,
            }));
        } else {
            setSelectedProfessor((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleEditProfessor = () => {
        if (!selectedProfessor) return;
        console.log("Editar professor", selectedProfessor);

        editProfessor(selectedProfessor._id, selectedProfessor)
            .then((data) => {
                if (data) {
                    setReload((prev) => !prev);  
                    setSelectedProfessor(null); 
                }
            })
            .catch((error) => {
                console.error("Erro ao editar professor:", error);
            });
    };

    const handleDeleteProfessor = () => {
        if (!selectedProfessor) return;
        deleteProfessor(selectedProfessor._id)
            .then(() => {
                setReload((prev) => !prev);  
                setSelectedProfessor(null);
            })
            .catch((error) => {
                console.error("Erro ao excluir professor:", error);
            });
    };

    const handleCreateProfessor = () => {
        createProfessor(newProfessor)
            .then((data) => {
                if (data) {
                    setReload((prev) => !prev);
                    setOpenCreateDialog(false); 
                    setNewProfessor({ name: '', school_disciplines: '', contact: '', phoneNumber: '', status: 'off' });
                }
            })
            .catch((error) => {
                console.error("Erro ao criar professor:", error);
            });
    };

    const handleAddProfessor = () => {
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
                        onClick={handleAddProfessor}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Adicionar Professor
                    </Button>
                    <h1 className="text-3xl font-bold text-left">Professores</h1>
                </div>

                <Table className="min-w-full table-auto">
                    <TableCaption>A lista de professores cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead hidden>id</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Disciplinas lecionadas</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {professores.map((professor) => (
                            <TableRow
                                key={usuario._id}
                                className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedShedule?._id === Teachersr._id ? 'bg-blue-300' : ''}`}
                                onClick={() => handleRowClick(professor)}
                            >
                                <TableCell hidden>{professor._id}</TableCell>
                                <TableCell>{professor.name}</TableCell>
                                <TableCell>{professor.schoolDisciplines}</TableCell>
                                <TableCell>{professor.contact}</TableCell>
                                <TableCell>{professor.phoneNumber}</TableCell>
                                <TableCell className="text-right">
                                    <Checkbox
                                        className="m-3"
                                        checked={professor.status === 'on'}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {selectedProfessor && (
                <Dialog open={Boolean(selectedProfessor)} onOpenChange={(open) => !open && setSelectedProfessor(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar professor</DialogTitle>
                            <DialogDescription>
                                Faça alterações no perfil do professor selecionado.
                            </DialogDescription>
                            </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {['name', 'schoolDisciplines', 'contact', 'phoneNumber'].map((field) => (
                                <div className="grid grid-cols-4 items-center gap-4" key={field}>
                                    <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        value={selectedProfessor[field] || ''}
                                        onChange={(e) => handleInputChange(field, e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                            ))}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">Status</Label>
                                <Checkbox
                                    id="status"
                                    value={selectedProfessor.status === 'on'}
                                    onChange={(e) => handleInputChange('status', e.target.checked ? 'on' : 'off')}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="destructive" onClick={handleDeleteProfessor}>Excluir Professor</Button>
                            <Button onClick={handleEditProfessor}>Salvar alterações</Button>
                            <Button variant="outline" onClick={() => setSelectedProfessor(null)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {openCreateDialog && (
                <Dialog open={openCreateDialog} onOpenChange={(open) => !open && setOpenCreateDialog(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Criar Novo Professor</DialogTitle>
                            <DialogDescription>
                                Preencha as informações para adicionar um novo professor.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {['name', 'schoolDisciplines', 'contact', 'phoneNumber'].map((field) => (
                                <div className="grid grid-cols-4 items-center gap-4" key={field}>
                                    <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        value={newProfessor[field] || ''}
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
                            <Button onClick={handleCreateProfessor}>Adicionar Professor</Button>
                            <Button variant="outline" onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ProfessoresPage;

