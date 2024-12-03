'use client'

import { useState, useEffect, SetStateAction } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllTeachers } from '@/services/professores';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ProfessoresPage = () => {
    const [professores, setProfessores] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState(null);

    useEffect(() => {
        getAllTeachers()
            .then((data) => {
                if (data) {
                    setProfessores(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleRowClick = (usuario: SetStateAction<null>) => {
        setSelectedTeachers(usuario);
    };

    const handleEditTeachers = () => {
        console.log("Editar professor", selectedTeachers);
    };

    const handleAddTeachers = () => {
        console.log("Adicionar professor");
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
                        onClick={handleAddTeachers}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Adicionar professores
                    </Button>
                    <h1 className="text-3xl font-bold text-left">Professores</h1>
                </div>

                <Table className="min-w-full table-auto">
                    <TableCaption>A lista de Professores cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead hidden>id</TableHead>
                            <TableHead>Código do professor</TableHead>
                            <TableHead>Disciplinas lecionadas</TableHead>
                            <TableHead>Contato</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {professores.map((usuario) => (
                            <TableRow
                                key={usuario._id}
                                className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedShedule?._id === Teachersr._id ? 'bg-blue-300' : ''}`}
                                onClick={() => handleRowClick(usuario)}
                            >
                                <TableCell hidden>{usuario._id}</TableCell>
                                <TableCell>{professores.name}</TableCell>
                                <TableCell>{professores.schoolDisciplines}</TableCell>
                                <TableCell>{professores.contact}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {selectedTeachers && (
                <Dialog open={Boolean(selectedTeachers)} onOpenChange={(open) => !open && setSelectedTeachers(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar professor</DialogTitle>
                            <DialogDescription>
                                Faça alterações no perfil do professor selecionado.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Nome</Label>
                                <Input
                                    id="name"
                                    value={selectedTeachers.name || ''}
                                    onChange={(e) => setSelectedTeachers({ ...selectedTeachers, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"
                                    value={selectedTeachers.email || ''}
                                    onChange={(e) => setSelectedTeachers({ ...selectedTeachers, email: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="level" className="text-right">Level</Label>
                                <Input
                                    id="level"
                                    value={selectedTeachers.level || ''}
                                    onChange={(e) => setSelectedTeachers({ ...selectedTeachers, level: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="level" className="text-right">Status</Label>
                                <Checkbox
                                    id="status"
                                    checked={selectedTeachers.status === 'on'}

                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleEditTeachers}>Salvar alterações</Button>
                            <Button variant="outline" onClick={() => setSelectedTeachers(null)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ProfessoresPage;
