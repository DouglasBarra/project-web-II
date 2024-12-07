const USER_BASE_API = "http://localhost:8080/api/profissionais";

export async function getAllProfissionais() {
    try {
        const response = await fetch(USER_BASE_API);
        if (response.ok) {
            const profissionais = await response.json();
            return profissionais;
        } else {
            console.error(`Erro ao buscar profissionais: ${response.status} - ${response.statusText}`);
            return [];
        }
    } catch (error) {
        console.error(`Erro ao tentar buscar os profissionais: ${error.message}`, error);
        return [];
    }
};

export async function editProfissional(id, profissionalData) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profissionalData),
        });

        if (response.ok) {
            const updatedProfissional = await response.json();
            return updatedProfissional;
        } else {
            console.error(`Erro ao editar profissional: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar editar o profissional: ${error.message}`, error);
        return null;
    }
};

export async function deleteProfissional(id) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return true; // Deletado com sucesso
        } else {
            console.error(`Erro ao deletar profissional: ${response.status} - ${response.statusText}`);
            return false; // Falha na deleção
        }
    } catch (error) {
        console.error(`Erro ao tentar deletar o profissional: ${error.message}`, error);
        return false; // Erro na requisição
    }
};

export async function createProfissional(profissionalData) {
    try {
        const response = await fetch(USER_BASE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profissionalData),
        });

        if (response.ok) {
            const newProfissional = await response.json();
            return newProfissional;
        } else {
            console.error(`Erro ao criar profissional: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar criar o profissional: ${error.message}`, error);
        return null;
    }
};
