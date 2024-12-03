const USER_BASE_API = "http://localhost:8080/api/alunos";

export async function getAllAlunos() {
    try {
        const response = await fetch(USER_BASE_API);
        if (response.ok) {
            const alunos = await response.json();
            return alunos;
        } else {
            console.error(`Erro ao buscar alunos: ${response.status} - ${response.statusText}`);
            return [];
        }
    } catch (error) {
        console.error(`Erro ao tentar buscar os alunos: ${error.message}`, error);
        return [];
    }
};

export async function editAluno(id, alunoData) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alunoData),
        });

        if (response.ok) {
            const updatedAluno = await response.json();
            return updatedAluno;
        } else {
            console.error(`Erro ao editar aluno: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar editar o aluno: ${error.message}`, error);
        return null;
    }
};

export async function deleteAluno(id) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return true; // Deletado com sucesso
        } else {
            console.error(`Erro ao deletar aluno: ${response.status} - ${response.statusText}`);
            return false; // Falha na deleção
        }
    } catch (error) {
        console.error(`Erro ao tentar deletar o aluno: ${error.message}`, error);
        return false; // Erro na requisição
    }
};

export async function createAluno(alunoData) {
    try {
        const response = await fetch(USER_BASE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alunoData),
        });

        if (response.ok) {
            const newAluno = await response.json();
            return newAluno;
        } else {
            console.error(`Erro ao criar aluno: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar criar o aluno: ${error.message}`, error);
        return null;
    }
};
