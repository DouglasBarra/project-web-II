const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/usuarios.json');
const Usuário = require('../models/usuariosModel');

const UsuáriosService = {
    getAll: () => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    },

    create: (usuárioData) => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const usuários = JSON.parse(data);

        const novoUsuário = new Usuário(
            usuárioData.name,
            usuárioData.email,
            usuárioData.user,
            usuárioData.password,
            usuárioData.level,
            usuárioData.status,
        );

        usuários.push(novoUsuário);

        fs.writeFileSync(dbPath, JSON.stringify(usuarios, null, 2))
        return novoUsuário;
    },

    update: (id, usuárioData) => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const usuários = JSON.parse(data);

        const usuárioIndex = usuários.findIndex(usuário => usuário.id == id);

        if (usuárioIndex === -1) {
            throw new Error('Usuário não encontrado');
        }

        usuários[usuárioIndex] = { ...usuários[usuárioIndex], ...usuárioData };

        fs.writeFileSync(dbPath, JSON.stringify(usuários, null, 2));
        return usuários[usuárioIndex];
    },

    delete: (id) => {
        
            const data = fs.readFileSync(dbPath, 'utf-8');
            const usuários = JSON.parse(data);

            const usuárioIndex = usuários.findIndex(usuário => usuário.id === id);

            if (usuárioIndex === -1) {
                throw new Error('Usuário não encontrado');
            }

            const [usuárioRemovido] = usuários.splice(usuárioIndex, 1);

            fs.writeFileSync(dbPath, JSON.stringify(usuários, null, 2));
            return usuárioRemovido;
        } 
}

module.exports = UsuáriosService;