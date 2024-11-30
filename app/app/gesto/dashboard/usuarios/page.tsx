'use client'

import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllUsers } from '@/services/usuarios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Estado para armazenar o usuário selecionado

    useEffect(() => {
        getAllUsers()
            .then((data) => {
                if (data) {
                    setUsuarios(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleRowClick = (usuario) => {
        setSelectedUser(usuario);
    };

    const handleEditUser = () => {
        console.log("Editar usuário", selectedUser);
    };

    const handleAddUser = () => {
        console.log("Adicionar usuário");
    };

    return (
        <div className="w-full h-full flex justify-center items-start p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={handleAddUser}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Adicionar Usuário
                    </button>
                    <h1 className="text-3xl font-bold text-left">Usuários</h1>
                </div>

                <Table className="min-w-full table-auto">
                    <TableCaption>A lista de usuários cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead hidden>id</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Mail</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usuarios.map((usuario) => (
                            <TableRow
                                key={usuario._id}
                                className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedUser?._id === usuario._id ? 'bg-blue-300' : ''}`}
                                onClick={() => handleRowClick(usuario)}
                            >
                                <TableCell hidden>{usuario._id}</TableCell>
                                <TableCell>{usuario.name}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>{usuario.level}</TableCell>
                                <TableCell className="text-right">
                                    <Checkbox className="m-3" checked={usuario.status === 'on'} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {selectedUser && (
                <Dialog open={Boolean(selectedUser)} onOpenChange={(open) => !open && setSelectedUser(null)}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Editar Usuário</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar Usuário</DialogTitle>
                            <DialogDescription>
                                Faça alterações no perfil do usuário selecionado.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Nome</Label>
                                <Input
                                    id="name"
                                    value={selectedUser.name || ''}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"
                                    value={selectedUser.email || ''}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="level" className="text-right">Level</Label>
                                <Input
                                    id="level"
                                    value={selectedUser.level || ''}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, level: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleEditUser}>Salvar alterações</Button>
                            <Button variant="outline" onClick={() => setSelectedUser(null)}>Cancelar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default UsuariosPage;
