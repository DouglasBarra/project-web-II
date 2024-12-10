import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const UsuarioTable = ({ Usuarios, onRowClick, selectedUsuarioId }) => {
    return (
        <Table className="min-w-full table-auto">
            <TableCaption>Usuários cadastrados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead hidden>id</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Usuarios.map((usuario) => (
                    <TableRow
                        key={usuario._id}
                        className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedUsuarioId === usuario._id ? 'bg-blue-300' : ''}`}
                        onClick={() => onRowClick(usuario)}
                    >
                        <TableCell>{usuario.name}</TableCell>
                        <TableCell>{usuario.email}</TableCell>
                        <TableCell>{usuario.user}</TableCell>
                        <TableCell hidden>{usuario.password}</TableCell>
                        <TableCell>{usuario.level}</TableCell>
                        <TableCell>{usuario.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UsuarioTable;
