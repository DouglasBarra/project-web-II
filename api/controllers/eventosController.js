const EventoModel = require("../models/eventosModel");

const EventosController = {
    get: async (req, res) => {
        try {
            const id = req.params.id
            const Evento = await EventoModel.findById();
            if (!Evento) {
                res.status(404).json({ msg: "Evento não encontrado!" });
                return;
            }
            res.json(Evento);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const Eventos = await EventoModel.find();
            res.json(Eventos)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async (req, res) => {
        try {
            const novoEvento = {
                name: req.body.name,
                description: req.body.email,
                comments: req.body.comments,
                date: req.body.date
            }
            const response = await EventoModel.create(novoEvento);
            res.status(201).json({ response, msg: "Evento criado com sucesso!" })
        } catch (error) {
            res.status(500);
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const Evento = {
                name: req.body.name,
                description: req.body.email,
                comments: req.body.comments,
                date: req.body.date
            }
            const updatedEvento = await EventoModel.findByIdAndUpdate(id, Evento);

            if (!updatedEvento) {
                res.status(404).json({ msg: "Evento não encontrado!" });
                return;
            }
            res.status(202).json({ Evento, msg: "Evento atualizado com sucesso!" });
        } catch (error) {
            res.status(404).json({ message: 'Evento não encontrado ou erro ao atualizar', error: error, message });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const Evento = await EventoModel.findById(id);

            if (!Evento) {
                res.status(404).json({ msg: "Evento não encontrado!" });
                return;
            }

            const deletedEvento = await EventoModel.findByIdAndDelete(id);
            res.status(200).json({ deletedEvento, msg: "Evento removido com sucesso!" });
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
    
module.exports = EventosController;