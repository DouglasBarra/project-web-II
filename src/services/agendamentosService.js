const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/agendamentos.json');
const Agendamento = require('../models/agendamentosModel');

const AgendamentosService = {
  getAll: () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  },

  create: (agendamentosData) => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const agendamentos = JSON.parse(data);

    const novoAgendamento = new Agendamento(
        agendamentosData.code_number,
        agendamentosData.description,
        agendamentosData.scheduled_date,
        agendamentosData.profissional,
    );
    
    agendamentos.push(novoAgendamento);

    fs.writeFileSync(dbPath, JSON.stringify(agendamentos, null, 2));
    return novoAgendamento;
  },

  update: (id, agendamentosData) => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const agendamentos = JSON.parse(data);

    const agendamentoIndex = agendamentos.findIndex(agend => agend.id == id);
    
    if (agendamentoIndex === -1) {
      throw new Error('Agendamento não encontrado');
    }

    agendamentos[agendamentoIndex] = { ...agendamentos[agendamentoIndex], ...agendamentosData };

    fs.writeFileSync(dbPath, JSON.stringify(agendamentos, null, 2));
    return agendamentos[agendamentoIndex];
  },

  delete: (id) => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const agendamentos = JSON.parse(data);

    const agendamentoIndex = agendamentos.findIndex(agend => agend.id === id);

    if (agendamentoIndex === -1) {
      throw new Error('Agendamento não encontrado');
    }

    const [agendamentoRemovido] = agendamentos.splice(agendamentoIndex, 1);

    fs.writeFileSync(dbPath, JSON.stringify(agendamentos, null, 2));
    return agendamentoRemovido;
  }
};

module.exports = AgendamentosService;