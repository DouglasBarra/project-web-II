const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/professores.json');
const Professor = require('../models/professoresModel');

const ProfessoresService = {
    getAll: () => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    },

    create: (professorData) => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const professores = JSON.parse(data);

        const novoProfessor = new Professor(
            professorData.name,
            professorData.schoolDisciplines,
            professorData.contact,
            professorData.phone_number,
            professorData.status
        );

        professores.push(novoProfessor);

        fs.writeFileSync(dbPath, JSON.stringify(professores, null, 2));
        return novoProfessor;
    },

    update: (id, professorData) => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const professores = JSON.parse(data);

        const professorIndex = professores.findIndex(professor => professor.id === id);

        if (professorIndex === -1) {
            throw new Error('Professor não encontrado');
        }

        professores[professorIndex] = { ...professores[professorIndex], ...professorData };

        fs.writeFileSync(dbPath, JSON.stringify(professores, null, 2));
        return professores[professorIndex];
    },

    delete: (id) => {
        
        const data = fs.readFileSync(dbPath, 'utf-8');
        const professores = JSON.parse(data);

        const professorIndex = professores.findIndex(professor => professor.id === id);

        if (professorIndex === -1) {
            throw new Error('Professor não encontrado');
        }

        const [professorRemovido] = professores.splice(professorIndex, 1);

        fs.writeFileSync(dbPath, JSON.stringify(professores, null, 2));
        return professorRemovido;
    }
};

module.exports = ProfessoresService;