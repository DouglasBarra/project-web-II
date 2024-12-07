// components/AlunosTable.tsx
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AlunosTable = ({ alunos, onRowClick, selectedAlunoId }) => {
    return (
        <Table className="min-w-full table-auto">
            <TableCaption>A lista de alunos cadastrados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead hidden>id</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Idade</TableHead>
                    <TableHead>Pais</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Característica</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {alunos.map((aluno) => (
                    <TableRow
                        key={aluno._id}
                        className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedAlunoId === aluno._id ? 'bg-blue-300' : ''}`}
                        onClick={() => onRowClick(aluno)}
                    >
                        <TableCell>{aluno.name}</TableCell>
                        <TableCell>{aluno.age}</TableCell>
                        <TableCell>{aluno.parents}</TableCell>
                        <TableCell>{aluno.phoneNumber}</TableCell>
                        <TableCell>{aluno.specialNeeds}</TableCell>
                        <TableCell className="text-right">{aluno.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AlunosTable;
