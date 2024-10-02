const ProfessoresSerive = require('../services/professoresService.js');

const ProfessorController = {
  getAll: (req, res) => {
    const professores = ProfessoresSerive.getAll();
    res.json(professores);
  },
  
  create: (req, res) => {
    const novoProfessor = req.body;
    const ProfessorCriado = ProfessoresSerive.create(novoProfessor);
    res.status(201).json(ProfessorCriado);
  }
};

module.exports = ProfessorController;