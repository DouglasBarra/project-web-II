const UsuáriosService = require('../services/usuariosService.js');

const UsuáriosController = {
    getAll: (req, res) => {
        try {
            const usuarios = UsuáriosServices.getAll();
            res.json(usuarios);
        }   catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários'});   
        }
    },

    create: (req, res) => {
        try {
            const novoUsuário = req.usuario;
            const usuarioCriado = UsuáriossService.create(novoUsuário);
            res.status(200).json(usuarioriado);
        }   catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário.'});
        }
    },

    update: (req, res) => {
        try {
            const id = req.params.id;
            const dadosAtualizados = req.body;
            const usuarioAtualizado = UsuáriosService.update(id, dadosAtualizados);
        } catch (error) {
            if (error.message === 'Usuário não encontrado') {
                res.status(404).json({ error: 'Usuário não encontrado.'});
            } else {
                res.status(500).json({ error: 'Erro ao atualizar usuário.'});
            }
        }
    },

    delete: (req, res) => {
        try {
            const id = req.params.id;
            const usuarioRemovido = UsuáriosService.delete(id);
            res.json({ message: 'Usuário removido com sucesso.', usuario: usuarioRemovido });
        } catch (error) {
            if (error.message === 'Usuário não encontrado') {
                res.status(404).json( {error: 'Usuário não encontrado.'});
            } else {
                res.status(500).json( { error: 'Erro ao deletar usuário.'});
            }
        }
    }
};

module.exports = UsuáriosController;