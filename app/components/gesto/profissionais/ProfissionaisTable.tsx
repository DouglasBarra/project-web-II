import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProfissinaisTable = ({ Profissionais, onRowClick, selectedProfissionalId }) => {
    return (
        <Table className="min-w-full table-auto">
            <TableCaption>Profissionais Cadastrados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead hidden>id</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Especialidade</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Profissionais.map((profissional) => (
                    <TableRow
                        key={profissional._id}
                        className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedProfissionalId === profissional._id ? 'bg-blue-300' : ''}`}
                        onClick={() => onRowClick(profissional)}
                    >
                        <TableCell>{profissional.name}</TableCell>
                        <TableCell>{profissional.specialty}</TableCell>
                        <TableCell>{profissional.contact}</TableCell>
                        <TableCell>{profissional.phoneNumber}</TableCell>
                        <TableCell>{profissional.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ProfissinaisTable;
