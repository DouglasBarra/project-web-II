const USER_BASE_API = "http://localhost:8080/api/eventos";

export async function RegisterEvent(description, comments, date) {
    try {
        const userData = { description, comments, date};
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
            console.error('Falha ao registrar evento:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Erro ao tentar registrar o evento:', error);
        return false;
    }
};

export async function getAllEvents() {
    try {
        const response = await fetch(USER_BASE_API);
        if (response.ok) {
            const events = await response.json(); 
            return events;
        } else {
            console.error('Erro ao buscar eventos:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Erro ao tentar buscar os eventos:', error);
        return []; 
    }
};


//criar edit//

//criar delete//