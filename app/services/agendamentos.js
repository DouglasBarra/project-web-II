const USER_BASE_API = "http://localhost:8080/api/agendamentos";

export async function getAllAgendamentos() {
    try {
        const response = await fetch(USER_BASE_API);
        if (response.ok) {
            const agendamentos = await response.json();
            return agendamentos;
        } else {
            console.error(`Erro ao buscar agendamentos: ${response.status} - ${response.statusText}`);
            return [];
        }
    } catch (error) {
        console.error(`Erro ao tentar buscar os agendamentos: ${error.message}`, error);
        return [];
    }
};

export async function editAgendamento(id, agendamentoData) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(agendamentoData),
        });

        if (response.ok) {
            const updatedAgendamento = await response.json();
            return updatedAgendamento;
        } else {
            console.error(`Erro ao editar agendamento: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar editar o agendamento: ${error.message}`, error);
        return null;
    }
};

export async function deleteAgendamento(id) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return true; // Deletado com sucesso
        } else {
            console.error(`Erro ao deletar agendamento: ${response.status} - ${response.statusText}`);
            return false; // Falha na deleção
        }
    } catch (error) {
        console.error(`Erro ao tentar deletar o agendamento: ${error.message}`, error);
        return false; // Erro na requisição
    }
};

export async function createAgendamento(agendamentoData) {
    try {
        const response = await fetch(USER_BASE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(agendamentoData),
        });

        if (response.ok) {
            const newAgendamento = await response.json();
            return newAgendamento;
        } else {
            console.error(`Erro ao criar agendamento: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar criar o agendamento: ${error.message}`, error);
        return null;
    }
};
