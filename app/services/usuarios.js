const USER_BASE_API = "http://localhost:8080/api/usuarios"

export async function loginUser(mail, password){
    try {
        const response = await fetch(USER_BASE_API)
        const data = await response.json()
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export async function RegisterUser(name, email, password) {
    try {
        const userData = { name, email, password, level: "admin", status: 'on' };
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
}