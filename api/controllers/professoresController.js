const ProfessoresModel = require("../models/professoresModel");

const ProfessoresController = {
  get: async (req, res) => {
    try {
      const id = req.params.id
      const Professor = await ProfessoresModel.findById(id);
      if (!Professor) {
        res.status(404).json({ msg: "Professor não encontrado!" });
        return;
      }
      res.json(Professor);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const professores = await ProfessoresModel.find();
      res.json(professor);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const Professor = {
        name: req.body.name,
        schoolDisciplines: req.body.schoolDisciplines,
        contact: req.body.contact,
        phoneNumber: req.body.phoneNumber,
        status: req.body.status
      }
      const response = await ProfessoresModel.create(Professor);
      res.status(200).json({ response, msg: "Professor criado com sucesso!" });
    } catch (error) {
      res.status(500);
      console.log(error)
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      const Professor = {
        name: req.body.name,
        schoolDisciplines: req.body.schoolDisciplines,
        contact: req.body.contact,
        phoneNumber: req.body.phoneNumber,
        status: req.body.status
      }
      const updatedProfessor = await ProfessoresModel.findByIdAndUpdate(id, Professor);

      if (!updatedProfessor) {
        res.status(404).json({ msg: "Professor não encontrado!" });
        return;
      }
      res.status(200).json({ Professor, msg: "Professor atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: 'Professor não encontrado ou erro ao atualizar', error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const Professor = await ProfessoresModel.findById(id);

      if (!Professor) {
        res.status(404).json({ msg: "Professor não encontrado!" });
        return;
      }

      const deletedProfessor = await ProfessoresModel.findByIdAndDelete(id);
      res.status(200).json({ deletedProfessor, msg: "Professor removido com sucesso!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = ProfessoresController;