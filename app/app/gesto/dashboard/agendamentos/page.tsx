'use client'

import { useState, useEffect, SetStateAction } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllSchedules } from '@/services/agendamentos';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AgendamentosPage = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    useEffect(() => {
        getAllSchedules()
            .then((data) => {
                if (data) {
                    setAgendamentos(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleRowClick = (usuario: SetStateAction<null>) => {
        setSelectedSchedule(usuario);
    };

    const handleEditSchedule = () => {
        console.log("Editar agendamento", selectedSchedule);
    };

    const handleAddSchedule = () => {
        console.log("Adicionar agendamento");
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
                        onClick={handleAddSchedule}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Adicionar agendamentos
                    </Button>
                    <h1 className="text-3xl font-bold text-left">Agendamentos</h1>
                </div>

                <Table className="min-w-full table-auto">
                    <TableCaption>A lista de agendamentos cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead hidden>id</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Data agendada</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agendamentos.map((usuario) => (
                            <TableRow
                                key={usuario._id}
                                className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedShedule?._id === scheduler._id ? 'bg-blue-300' : ''}`}
                                onClick={() => handleRowClick(usuario)}
                            >
                                <TableCell hidden>{usuario._id}</TableCell>
                                <TableCell>{agendamentos.code_number}</TableCell>
                                <TableCell>{agendamento.description}</TableCell>
                                <TableCell>{agendamentos.date}</TableCell>
                                <TableCell className="text-right">
                                    <Checkbox className="m-3" checked={usuario.status === 'on'} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {selectedSchedule && (
                <Dialog open={Boolean(selectedSchedule)} onOpenChange={(open) => !open && setSelectedSchedule(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar agendamento</DialogTitle>
                            <DialogDescription>
                                Faça alterações no perfil do agendamento selecionado.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Nome</Label>
                                <Input
                                    id="name"
                                    value={selectedSchedule.name || ''}
                                    onChange={(e) => setSelectedSchedule({ ...selectedSchedule, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"
                                    value={selectedSchedule.email || ''}
                                    onChange={(e) => setSelectedSchedule({ ...selectedSchedule, email: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="level" className="text-right">Level</Label>
                                <Input
                                    id="level"
                                    value={selectedSchedule.level || ''}
                                    onChange={(e) => setSelectedSchedule({ ...selectedSchedule, level: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="level" className="text-right">Status</Label>
                                <Checkbox
                                    id="status"
                                    checked={selectedSchedule.status === 'on'}

                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleEditSchedule}>Salvar alterações</Button>
                            <Button variant="outline" onClick={() => setSelectedSchedule(null)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default AgendamentosPage;
