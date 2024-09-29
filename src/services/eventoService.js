const fs = require('fs');
const path = require('path');
const dbPath = path.join(_dirname, '../db/eventos.json');
const Evento = require('../models/eventoModel');

const EventoService = {
    getAll: () =>{
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    },

    create: (eventoData) => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const eventos = JSON.parse(data);

        const novoEvento = new Evento(
            eventoData.name,
            evento.Data.description,
            eventoData.comments,
            eventoData.date,
        );

        eventos.push(novoEvento);

        fs.writeFileSync(dbPath, JSON.stringify(eventos, null, 2))
        return novoEvento;
    },

    update: (id, eventoData) => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const eventos = JSON.parse(data);

        const index = eventos.findIndex(evento => evento.id == id);

        if (index === -1) {
            throw new Error('Evento não encontrado');
        }

        eventos[index] = { ...eventos[index], ...eventoData };

        fs.writeFileSync(dbPath, JSON.stringify(eventos, null, 2));
        return eventos[index];
    },

    delete: (id) => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const eventos = JSON.perse(data);

        const index = eventos.findIndex(evento => evento.id ===id);

        if (index === -1) {
            throw new Error('Evento não encontrado');
        }

        const [eventoRemovido] = eventos.splice(index, 1);

        fs.writeFileSync(dbPath, JSON.stringify(eventos, null, 2));
        return eventoRemovido;
    }
};

module.exports = EventoService;