const ProfissionalService = require('../services/profissionalService');

const ProfissionalController = {
  getAll: (req, res) => {
    const profissionais = ProfissionalService.getAll();
    res.json(profissionais);
  },
  
  create: (req, res) => {
    const novoProfissional = req.body;
    const profissionalCriado = ProfissionalService.create(novoProfissional);
    res.status(201).json(profissionalCriado);
  }
};

module.exports = ProfissionalController;