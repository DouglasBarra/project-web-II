const USER_BASE_API = "http://localhost:8080/api/usuariostela";

export async function getAllUsuarios() {
    try {
        const response = await fetch(USER_BASE_API);
        if (response.ok) {
            const alunos = await response.json();
            return alunos;
        } else {
            console.error(`Erro ao buscar usuarios: ${response.status} - ${response.statusText}`);
            return [];
        }
    } catch (error) {
        console.error(`Erro ao tentar buscar os usuarios: ${error.message}`, error);
        return [];
    }
};

export async function editUsuario(id, usuarioData) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioData),
        });

        if (response.ok) {
            const updatedUsuario = await response.json();
            return updatedUsuario;
        } else {
            console.error(`Erro ao editar usuario: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar editar o usuario: ${error.message}`, error);
        return null;
    }
};

export async function deleteUsuario(id) {
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

export async function createUsuario(usuarioData) {
    try {
        const response = await fetch(USER_BASE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioData),
        });

        if (response.ok) {
            const newUsuario = await response.json();
            return newUsuario;
        } else {
            console.error(`Erro ao criar usuario: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar criar o usuario: ${error.message}`, error);
        return null;
    }
};
