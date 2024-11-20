const UsuarioModel = require('../models/usuariosModel');

const UsuariosController = {
    get: async (req, res) => {
        try {
            const id = req.params.id
            const Usuario = await UsuarioModel.findById();
            if (!Usuario) {
                res.status(404).json({ msg: "Usuario não encontrado!" });
                return;
            }
            res.json(Usuario);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const Usuarios = await UsuarioModel.find();
            res.json(Usuarios)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async (req, res) => {
        try {
            const novoUsuario = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                level: req.body.level,
                status: req.body.status
            }
            const response = await UsuarioModel.create(novoUsuario);
            res.status(201).json({ response, msg: "Usuario criado com sucesso!" })
        } catch (error) {
            res.status(500);
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            const Usuario = {
                name: req.body.name,
                email: req.body.email,
                user: req.body.user,
                password: req.body.password,
                level: req.body.level,
                status: req.body.status
            }
            const updatedUsuario = await UsuarioModel.findByIdAndUpdate(id, Usuario);

            if (!updatedUsuario) {
                res.status(404).json({ msg: "Usuario não encontrado!" });
                return;
            }

            res.status(200).json({ Usuario, msg: "Usuario atualizado com sucesso!" });
        } catch (error) {
            res.status(404).json({ message: 'Usuario não encontrado ou erro ao atualizar', error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const Usuario = await UsuarioModel.findById(id);

            if (!Usuario) {
                res.status(404).json({ msg: "Usuario não encontrado!" });
                return;
            }

            const deletedUsuario = await UsuarioModel.findByIdAndDelete(id);
            res.status(200).json({ deletedUsuario, msg: "Usuario removido com sucesso!" });
        } catch (error) {
            res.status(500).json(error);
        }

    }
};

module.exports = UsuariosController;
