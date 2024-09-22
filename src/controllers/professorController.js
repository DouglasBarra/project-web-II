const ProfessoresService = require('../services/professorService');

const ProfessoresController = {
  getAll: (req, res) => {
    const professores = ProfessoresService.getAll();
    res.json(professores);
  },
  
  create: (req, res) => {
    const novoProfessor = req.body;
    const professorCriado = ProfessoresService.create(novoProfessor);
    res.status(201).json(professorCriado);
  }
};

module.exports = ProfessoresController;