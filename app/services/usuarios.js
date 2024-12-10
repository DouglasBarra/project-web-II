const USER_BASE_API = "http://localhost:8080/api/usuarios";

// Função para fazer login de um usuário
export async function loginUser(mail, password) {
    try {
        const response = await fetch(USER_BASE_API + `/${mail}&${password}`);
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

export async function RegisterUser(name, email, password) {
    try {
        const userData = { name, email, password, level: "user", status: 'on' };
        const response = await fetch(USER_BASE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Falha ao registrar usuário:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Erro ao tentar registrar o usuário:', error);
        return false;
    }
};

export async function getAllUsers() {
    try {
        const response = await fetch(USER_BASE_API);
        if (response.ok) {
            const users = await response.json(); 
            return users;
        } else {
            console.error('Erro ao buscar usuários:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Erro ao tentar buscar os usuários:', error);
        return []; 
    }
};
export async function editUser(id, usuarioData) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioData),
        });

        if (response.ok) {
            const updatedProfissional = await response.json();
            return updatedProfissional;
        } else {
            console.error(`Erro ao editar usuário: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao tentar editar o usuário: ${error.message}`, error);
        return null;
    }
};

export async function deleteUser(id) {
    try {
        const response = await fetch(`${USER_BASE_API}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return true; // Deletado com sucesso
        } else {
            console.error(`Erro ao deletar usuário: ${response.status} - ${response.statusText}`);
            return false; // Falha na deleção
        }
    } catch (error) {
        console.error(`Erro ao tentar deletar o usuário: ${error.message}`, error);
        return false; // Erro na requisição
    }
};

export async function createUser(usuarioData) {
    try {
        const response = await fetch(USER_BASE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioData),
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
