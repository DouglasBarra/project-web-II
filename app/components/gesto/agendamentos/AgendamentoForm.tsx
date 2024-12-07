import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AgendamentoForm = ({ agendamento, onChange, onSubmit, onDelete, onCancel, newAgendamento}) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
                {['code_number', 'description', 'scheduled_date'].map((field) => (
                    <div className="grid grid-cols-4 items-center gap-4" key={field}>
                        <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                        <Input
                            id={field}
                            value={agendamento[field] || ''}
                            onChange={(e) => onChange(field, e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-4">
                { newAgendamento && (<Button variant="destructive" onClick={onDelete}>Excluir</Button>)}
                <Button variant='success' onClick={onSubmit} type="submit">Salvar</Button>
                <Button variant="default" onClick={onCancel}>Cancelar</Button>
            </div>
        </form>
    );
};

export default AgendamentoForm;
