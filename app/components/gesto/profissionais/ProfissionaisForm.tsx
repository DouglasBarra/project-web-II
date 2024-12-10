import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ProfissionaisForm = ({ profissional, onChange, onSubmit, onDelete, onCancel, newProfissional }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
                {['name', 'specialty', 'contact', 'phoneNumber', 'status'].map((field) => (
                    <div className="grid grid-cols-4 items-center gap-4" key={field}>
                        <Label htmlFor={field} className="text-right">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                        <Input
                            id={field}
                            value={profissional[field] || ''}
                            onChange={(e) => onChange(field, e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-4">
                { newProfissional && (<Button variant="destructive" onClick={onDelete}>Excluir</Button>)}
                <Button variant='success' onClick={onSubmit} type="submit">Salvar</Button>
                <Button variant="default" onClick={onCancel}>Cancelar</Button>
            </div>
        </form>
    );
};

export default ProfissionaisForm;
