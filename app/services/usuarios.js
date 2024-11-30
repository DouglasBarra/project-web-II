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
