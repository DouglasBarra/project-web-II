'use client'

import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllEvents } from '@/services/eventos';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Description } from '@radix-ui/react-dialog';

const EventosPage = () => {
    const [eventos, setEventos] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // Estado para armazenar o usuário selecionado

    useEffect(() => {
        getAllEvents()
            .then((data) => {
                if (data) {
                    setEventos(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleRowClick = (evento) => {
        setSelectedEvent(evento);
    };

    const handleEditUser = () => {
        console.log("Editar evento", selectedEvent);
    };

    const handleAddevent = () => {
        console.log("Adicionar evento");
    };

    return (
        <div className="w-full h-full flex justify-center items-start p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={handleAddEvent}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Adicionar Evento
                    </button>
                    <h1 className="text-3xl font-bold text-left">Eventos</h1>
                </div>

                <Table className="min-w-full table-auto">
                    <TableCaption>A lista de eventos cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead hidden>id</TableHead>
                            <TableHead>Descricao</TableHead>
                            <TableHead>Comentarios</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {eventos.map((evento) => (
                            <TableRow
                                key={evento._id}
                                className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedUser?._id === usuario._id ? 'bg-blue-300' : ''}`}
                                onClick={() => handleRowClick(evento)}
                            >
                                <TableCell hidden>{evento._id}</TableCell>
                                <TableCell>{evento.description}</TableCell>
                                <TableCell>{evento.comments}</TableCell>
                                <TableCell>{evento.date}</TableCell>
                                <TableCell className="text-right">
                                    <Checkbox className="m-3" checked={evento.status === 'on'} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {selectedEvent && (
                <Dialog open={Boolean(selectedEvent)} onOpenChange={(open) => !open && setSelectedEvent(null)}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Editar Evento</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar Evento</DialogTitle>
                            <DialogDescription>
                                Faça alterações no perfil do evento selecionado.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Descricao</Label>
                                <Input
                                    id="description"
                                    value={selectedEvent.description || ''}
                                    onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="comments" className="text-right">Comentarios</Label>
                                <Input
                                    id="comments"
                                    value={selectedEvent.comments || ''}
                                    onChange={(e) => setSelectedEvent({ ...selectedEvent, comments: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">Data</Label>
                                <Input
                                    id="date"
                                    value={selectedEvent.date || ''}
                                    onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleEditEvent}>Salvar alterações</Button>
                            <Button variant="outline" onClick={() => setSelectedEvent(null)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default EventosPage;
