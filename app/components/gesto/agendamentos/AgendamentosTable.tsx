import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AgendamentosTable = ({ Agendamentos, onRowClick, selectedAgendamentoId }) => {
    return (
        <Table className="min-w-full table-auto">
            <TableCaption>Agendamentos cadastrados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead hidden>id</TableHead>
                    <TableHead>Codigo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Agendamentos.map((agendamento) => (
                    <TableRow
                        key={agendamento._id}
                        className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedAgendamentoId === agendamento._id ? 'bg-blue-300' : ''}`}
                        onClick={() => onRowClick(agendamento)}
                    >
                        <TableCell>{agendamento.code_number}</TableCell>
                        <TableCell>{agendamento.description}</TableCell>
                        <TableCell>{agendamento.scheduled_date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AgendamentosTable;
