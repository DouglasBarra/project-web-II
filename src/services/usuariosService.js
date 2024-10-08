const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/usuarios.json');
const Usuario = require('../models/usuariosModel');

const UsuariosService = {
    getAll: () => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    },

    create: (usuarioData) => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const usuarios = JSON.parse(data);

        const novoUsuario = new Usuario(
            usuarioData.name,
            usuarioData.email,
            usuarioData.user,
            usuarioData.password,
            usuarioData.level,
            usuarioData.status,
        );

        usuarios.push(novoUsuario);

        fs.writeFileSync(dbPath, JSON.stringify(usuarios, null, 2));
        return novoUsuario;
    },

    update: (id, usuarioData) => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const usuarios = JSON.parse(data);

        const usuarioIndex = usuarios.findIndex(usuario => usuario.id == id);

        if (usuarioIndex === -1) {
            throw new Error('Usuario nao encontrado');
        }

        usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...usuarioData };

        fs.writeFileSync(dbPath, JSON.stringify(usuarios, null, 2));
        return usuarios[usuarioIndex];
    },

    delete: (id) => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const usuarios = JSON.parse(data);

        const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id);

        if (usuarioIndex === -1) {
            throw new Error('Usuario nao encontrado');
        }

        const [usuarioRemovido] = usuarios.splice(usuarioIndex, 1);

        fs.writeFileSync(dbPath, JSON.stringify(usuarios, null, 2));
        return usuarioRemovido;
    }
};

module.exports = UsuariosService;
