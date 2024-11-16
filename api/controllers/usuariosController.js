const UsuariosService = require('../services/usuariosService.js');

const UsuariosController = {
    getAll: (req, res) => {
        try {
            const usuarios = UsuariosService.getAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuarios' });
        }
    },

    create: (req, res) => {
        try {
            const novoUsuario = req.body;
            const usuarioCriado = UsuariosService.create(novoUsuario);
            res.status(200).json(usuarioCriado);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuario.' });
        }
    },

    update: (req, res) => {
        try {
            const id = req.params.id;
            const dadosAtualizados = req.body;
            const usuarioAtualizado = UsuariosService.update(id, dadosAtualizados);
            res.json(usuarioAtualizado);
        } catch (error) {
            if (error.message === 'Usuario nao encontrado') {
                res.status(404).json({ error: 'Usuario nao encontrado.' });
            } else {
                res.status(500).json({ error: 'Erro ao atualizar usuario.' });
            }
        }
    },

    delete: (req, res) => {
        try {
            const id = req.params.id;
            const usuarioRemovido = UsuariosService.delete(id);
            res.json({ message: 'Usuario removido com sucesso.', usuario: usuarioRemovido });
        } catch (error) {
            if (error.message === 'Usuario nao encontrado') {
                res.status(404).json({ error: 'Usuario nao encontrado.' });
            } else {
                res.status(500).json({ error: 'Erro ao deletar usuario.' });
            }
        }
    }
};

module.exports = UsuariosController;
