const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/eventos.json');
const Evento = require('../models/eventosModel');

const EventosService = {
    getAll: () => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    },

    create: (eventoData) => {
        const data = fs.readFileSync(dbPath, 'utf-8');
        const eventos = JSON.parse(data);

        const novoEvento = new Evento(
            eventoData.name,
            eventoData.description,
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

        const eventoIndex = eventos.findIndex(evento => evento.id == id);

        if (eventoIndex === -1) {
            throw new Error('Evento não encontrado');
        }

        eventos[eventoIndex] = { ...eventos[eventoIndex], ...eventoData };

        fs.writeFileSync(dbPath, JSON.stringify(eventos, null, 2));
        return eventos[eventoIndex];
    },

    delete: (id) => {
        
            const data = fs.readFileSync(dbPath, 'utf-8');
            const eventos = JSON.parse(data);

            const eventoIndex = eventos.findIndex(evento => evento.id ===id);

            if (eventoIndex === -1) {
                throw new Error('Evento não encontrado');
            }

            const [eventoRemovido] = eventos.splice(eventoIndex, 1);

            fs.writeFileSync(dbPath, JSON.stringify(eventos, null, 2));
            return eventoRemovido;
        } 
}

module.exports = EventosService;