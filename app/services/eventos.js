const USER_BASE_API = "http://localhost:8080/api/eventos";

export async function getAllEventos() {
    try {
        const response = await fetch(USER_BASE_API);
        if (response.ok) {
            const eventos = await response.json();
            return eventos;
        } else {
            console.error(`Erro ao buscar eventos: ${response.status} - ${response.statusText}`);
            return [];
        }
    } catch (error) {
        console.error(`Erro ao tentar buscar os eventos: ${error.message}`, error);
        return [];
    }
};

export async function editEvento(id, eventoData) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventoData),
        });

        if (response.ok) {
            const updatedEvento = await response.json();
            return updatedEvento;
        } else {
            console.error(`Erro ao editar eventos: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar editar o evento: ${error.message}`, error);
        return null;
    }
};

export async function deleteEvento(id) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return true; // Deletado com sucesso
        } else {
            console.error(`Erro ao deletar evento: ${response.status} - ${response.statusText}`);
            return false; // Falha na deleção
        }
    } catch (error) {
        console.error(`Erro ao tentar deletar o evento: ${error.message}`, error);
        return false; // Erro na requisição
    }
};

export async function createEvento(eventoData) {
    try {
        const response = await fetch(USER_BASE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventoData),
        });

        if (response.ok) {
            const newEvento = await response.json();
            return newEvento;
        } else {
            console.error(`Erro ao criar evento: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar criar o evento: ${error.message}`, error);
        return null;
    }
};



