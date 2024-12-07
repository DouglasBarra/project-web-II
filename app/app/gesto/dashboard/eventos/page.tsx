'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { editEvento, getAllEventos, deleteEvento, createEvento } from '@/services/eventos'; 
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EventosPage = () => {
    const [eventos, setEventos] = useState([]);
    const [selectedEvento, setSelectedEvento] = useState(null);
    const [reload, setReload] = useState(false);
    const [newEvento, setNewEvento] = useState({ name: '', description: '', comments: '', date: ''});
    const [openCreateDialog, setOpenCreateDialog] = useState(false);  // Estado para controlar o diálogo de criação

    useEffect(() => {
        getAllEventos()
            .then((data) => {
                if (data) {
                    setEventos(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [reload]);

    const handleRowClick = (evento) => {
        setSelectedEvento(evento);
    };

    const handleInputChange = (field, value, isNew = false) => {
        if (isNew) {
            setNewEvento((prev) => ({
                ...prev,
                [field]: value,
            }));
        } else {
            setSelectedEvento((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleEditEvento = () => {
        if (!selectedEvento) return;
        console.log("Editar evento", selectedEvento);

        editEvento(selectedEvento._id, selectedEvento)
            .then((data) => {
                if (data) {
                    setReload((prev) => !prev);  
                    setSelectedEvento(null); 
                }
            })
            .catch((error) => {
                console.error("Erro ao editar evento:", error);
            });
    };

    const handleDeleteEvento = () => {
        if (!selectedEvento) return;
        deleteEvento(selectedEvento._id)
            .then(() => {
                setReload((prev) => !prev);  
                setSelectedEvento(null);
            })
            .catch((error) => {
                console.error("Erro ao excluir evento:", error);
            });
    };

    const handleCreateEvento = () => {
        createEvento(newEvento)
            .then((data) => {
                if (data) {
                    setReload((prev) => !prev);
                    setOpenCreateDialog(false); 
                    setNewEvento({ name: '', description: '', comments: '', date: '' });
                }
            })
            .catch((error) => {
                console.error("Erro ao criar evento:", error);
            });
    };

    const handleAddEvento = () => {
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
                        onClick={handleAddEvento}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Adicionar Evento
                    </Button>
                    <h1 className="text-3xl font-bold text-left">Eventos</h1>
                </div>

                <Table className="min-w-full table-auto">
                    <TableCaption>A lista de eventos cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead hidden>id</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Descricao</TableHead>
                            <TableHead>Comentarios</TableHead>
                            <TableHead>Data</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {eventos.map((evento) => (
                            <TableRow
                                key={evento._id}
                                className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedEvento?._id === evento._id ? 'bg-blue-300' : ''}`}
                                onClick={() => handleRowClick(evento)}
                            >
                                <TableCell hidden>{evento._id}</TableCell>
                                <TableCell>{evento.name}</TableCell>
                                <TableCell>{evento.description}</TableCell>
                                <TableCell>{evento.comments}</TableCell>
                                <TableCell>{evento.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {selectedEvento && (
                <Dialog open={Boolean(selectedEvento)} onOpenChange={(open) => !open && setSelectedEvento(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar Evento</DialogTitle>
                            <DialogDescription>
                                Faça alterações no perfil do evento selecionado.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {['name','description','comments','date' ].map((field) => (
                                <div className="grid grid-cols-4 items-center gap-4" key={field}>
                                    <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        value={selectedEvento[field] || ''}
                                        onChange={(e) => handleInputChange(field, e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                            ))}
                        </div>

                        <DialogFooter>
                            <Button variant="destructive" onClick={handleDeleteEvento}>Excluir Evento</Button>
                            <Button onClick={handleEditEvento}>Salvar alterações</Button>
                            <Button variant="outline" onClick={() => setSelectedEvento(null)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {openCreateDialog && (
                <Dialog open={openCreateDialog} onOpenChange={(open) => !open && setOpenCreateDialog(false)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Criar Novo Evento</DialogTitle>
                            <DialogDescription>
                                Preencha as informações para adicionar um novo evento.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {['name','description','comments','date'].map((field) => (
                                <div className="grid grid-cols-4 items-center gap-4" key={field}>
                                    <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input
                                        id={field}
                                        value={newEvento[field] || ''}
                                        onChange={(e) => handleInputChange(field, e.target.value, true)}
                                        className="col-span-3"
                                    />
                                </div>
                            ))}
                        </div>

                        <DialogFooter>
                            <Button onClick={handleCreateEvento}>Adicionar Evento</Button>
                            <Button variant="outline" onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default EventosPage;
