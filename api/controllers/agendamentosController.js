const AgendamentosModel = require("../models/AgendamentosModel");
const Profissional = require("../models/profissionaisModel");

const AgendamentosController = {
  get: async (req, res) => {
    try {
      const id = req.params.id
      const Agendamento = await AgendamentosModel.findById(id);
      if (!Agendamento) {
        res.status(404).json({ msg: "Agendamento não encontrado!" });
        return;
      }
      res.json(Agendamento);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const Agendamentos = await AgendamentosModel.find();
      res.json(Agendamentos);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const Agendamento = {
        code_number: req.body.code_number,
        description: req.body.description,
        schedule_date: req.body.schedule_date,
        profissional: req.body.profissional
      }
      const response = await AgendamentosModel.create(Agendamento);
      res.status(200).json({ response, msg: "Agendamento criado com sucesso!" });
    } catch (error) {
      res.status(500);
      console.log(error)
    }
  },
 update: async (req, res) => {
    try {
      const id = req.params.id;

      const Agendamento = {
        code_number: req.body.code_number,
        description: req.body.description,
        schedule_date: req.body.schedule_date,
        profissional: req.body.profissional
      }
      const updatedAgendamento = await AgendamentosModel.findByIdAndUpdate(id, Agendamento);

      if (!updatedAgendamento) {
        res.status(404).json({ msg: "Agendamento não encontrado!" });
        return;
      }
      res.status(200).json({ Agendamento, msg: "Agendamento atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: 'Agendamento não encontrado ou erro ao atualizar', error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const Agendamento = await AgendamentosModel.findById(id);

      if (!Agendamento) {
        res.status(404).json({ msg: "Agendamento não encontrado!" });
        return;
      }

      const deletedAgendamento = await AgendamentosModel.findByIdAndDelete(id);
      res.status(200).json({ deletedAgendamento, msg: "Agendamento removido com sucesso!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = AgendamentosController;