const USER_BASE_API = "http://localhost:8080/api/professores";

export async function getAllProfessores() {
    try {
        const response = await fetch(USER_BASE_API);
        if (response.ok) {
            const professors = await response.json();
            return professors;
        } else {
            console.error(`Erro ao buscar professors: ${response.status} - ${response.statusText}`);
            return [];
        }
    } catch (error) {
        console.error(`Erro ao tentar buscar os professors: ${error.message}`, error);
        return [];
    }
};

export async function editProfessor(id, professorData) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(professorData),
        });

        if (response.ok) {
            const updatedProfessor = await response.json();
            return updatedProfessor;
        } else {
            console.error(`Erro ao editar professor: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar editar o professor: ${error.message}`, error);
        return null;
    }
};

export async function deleteProfessor(id) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return true; // Deletado com sucesso
        } else {
            console.error(`Erro ao deletar professor: ${response.status} - ${response.statusText}`);
            return false; // Falha na deleção
        }
    } catch (error) {
        console.error(`Erro ao tentar deletar o professor: ${error.message}`, error);
        return false; // Erro na requisição
    }
};

export async function createProfessor(professorData) {
    try {
        const response = await fetch(USER_BASE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(professorData),
        });

        if (response.ok) {
            const newProfessor = await response.json();
            return newProfessor;
        } else {
            console.error(`Erro ao criar professor: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar criar o professor: ${error.message}`, error);
        return null;
    }
};
