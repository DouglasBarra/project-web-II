const USER_BASE_API = "http://localhost:8080/api/professores";

export async function RegisterAgendamento(name, schoolDisciplines, contact) {
    try {
        const scheduleData = { name, schoolDisciplines, contact};
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
            console.error('Falha ao registrar professor:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Erro ao tentar registrar o professor:', error);
        return false;
    }
};

export async function getAllTeachers() {
    try {
        const response = await fetch(USER_BASE_API);
        if (response.ok) {
            const events = await response.json(); 
            return events;
        } else {
            console.error('Erro ao buscar professor:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Erro ao tentar buscar os professor:', error);
        return []; 
    }
};


//criar edit//

//criar delete//