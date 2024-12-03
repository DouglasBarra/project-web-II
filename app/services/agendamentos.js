const USER_BASE_API = "http://localhost:8080/api/agendamentos";

export async function RegisterAgendamento(code_number, description, date) {
    try {
        const scheduleData = { code_number, description, date};
        const response = await fetch(USER_BASE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduleData),
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Falha ao registrar agendamento:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Erro ao tentar registrar o agendamento:', error);
        return false;
    }
};

export async function getAllSchedules() {
    try {
        const response = await fetch(USER_BASE_API);
        if (response.ok) {
            const events = await response.json(); 
            return events;
        } else {
            console.error('Erro ao buscar agendamentos:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Erro ao tentar buscar os agendamentos:', error);
        return []; 
    }
};


//criar edit//

//criar delete//