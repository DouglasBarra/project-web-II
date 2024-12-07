import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EventoTable = ({ Eventos, onRowClick, selectedEventoId }) => {
    return (
        <Table className="min-w-full table-auto">
            <TableCaption>Agendamentos cadastrados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead hidden>id</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Comentarios</TableHead>
                    <TableHead>Data</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Eventos.map((evento) => (
                    <TableRow
                        key={evento._id}
                        className={`hover:bg-gray-300 transition-all duration-200 font-bold ${selectedEventoId === evento._id ? 'bg-blue-300' : ''}`}
                        onClick={() => onRowClick(evento)}
                    >
                        <TableCell>{evento.name}</TableCell>
                        <TableCell>{evento.description}</TableCell>
                        <TableCell>{evento.comments}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default EventoTable;
