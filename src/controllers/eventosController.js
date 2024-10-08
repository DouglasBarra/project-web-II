const EventosService = require('../services/eventosService.js');

const EventosController = {
    getAll: (req, res) => {
        try {
            const eventos = EventosService.getAll();
            res.json(eventos);
        }   catch (error) {
            res.status(500).json({ error: 'Erro ao buscar eventos'});   
        }
    },

    create: (req, res) => {
        try {
            const novoEvento = req.body;
            const eventoCriado = EventosService.create(novoEvento);
            res.status(200).json(eventoCriado);
        }   catch (error) {
            res.status(500).json({ error: 'Erro ao criar evento.'});
        }
    },

    update: (req, res) => {
        try {
            const id = req.params.id;
            const dadosAtualizados = req.body;
            const eventoAtualizado = EventosService.update(id, dadosAtualizados);
            res.status(200).json(eventoAtualizado);
        } catch (error) {
            if (error.message === 'Evento não encontrado') {
                res.status(404).json({ error: 'Evento não encontrado.'});
            } else {
                res.status(500).json({ error: 'Erro ao atualizar evento.'});
            }
        }
    },

    delete: (req, res) => {
        try {
            const id = req.params.id;
            const eventoRemovido = EventosService.delete(id);
            res.json({ message: 'Evento removido com sucesso.', evento: eventoRemovido });
        } catch (error) {
            if (error.message === 'Evento não encontrado') {
                res.status(404).json( {error: 'Evento não encontrado.'});
            } else {
                res.status(500).json( { error: 'Erro ao deletar evento.'});
            }
        }
    }
};

module.exports = EventosController;