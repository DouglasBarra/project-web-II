const AgendamentosService = require('../services/agendamentosService.js');

const AgendamentoController = {
  getAll: (req, res) => {
    try {
      const agendamentos = AgendamentosService.getAll();
      res.json(agendamentos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
    }
  },
  
  create: (req, res) => {
    try {
      const novoAgendamento = req.body;
      const agendamentoCriado = AgendamentosService.create(novoAgendamento);
      res.status(200).json(agendamentoCriado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar agendamento.' });
    }
  },

  update: (req, res) => {
    try {
      const id = req.params.id;
      const dadosAtualizados = req.body;
      const agendamentoAtualizado = AgendamentosService.update(id, dadosAtualizados);
      res.status(200).json(agendamentoAtualizado);
    } catch (error) {
      if (error.message === 'Agendamento não encontrado') {
        res.status(404).json({ error: 'Agendamento não encontrado.' });
      } else {
        res.status(500).json({ error: 'Erro ao atualizar agendamento.' });
      }
    }
  },

  delete: (req, res) => {
    try {
      const id = req.params.id;
      const agendamentoRemovido = AgendamentosService.delete(id);
      res.json({ message: 'Agendamento removido com sucesso.', agendamento: agendamentoRemovido });
    } catch (error) {
      if (error.message === 'Agendamento não encontrado') {
        res.status(404).json({ error: 'Agendamento não encontrado.' });
      } else {
        res.status(500).json({ error: 'Erro ao deletar agendamento.' });
      }
    }
  }
};

module.exports = AgendamentoController;