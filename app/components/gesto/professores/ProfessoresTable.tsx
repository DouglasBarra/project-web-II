import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProfessoresTable = ({ Professores, onRowClick, selectedProfessoresId }) => {
    return (
        <Table className="min-w-full table-auto">
            <TableCaption>Professores cadastrados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead hidden>id</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Disciplinas</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Professores.map((professor) => (
                    <TableRow
                        key={professor._id}
                        className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedProfessoresId === professor._id ? 'bg-blue-300' : ''}`}
                        onClick={() => onRowClick(professor)}
                    >
                        <TableCell>{professor.name}</TableCell>
                        <TableCell>{professor.schoolDisciplines}</TableCell>
                        <TableCell>{professor.contact}</TableCell>
                        <TableCell>{professor.phoneNumber}</TableCell>
                        <TableCell>{professor.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ProfessoresTable;
