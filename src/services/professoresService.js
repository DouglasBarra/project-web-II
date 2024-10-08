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
    }
};

module.exports = ProfessoresService;