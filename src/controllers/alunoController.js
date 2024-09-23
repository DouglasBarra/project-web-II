const AlunosService = require('../services/alunoService');

const AlunosController = {
  getAll: (req, res) => {
    const alunos = AlunosService.getAll();
    res.json(alunos);
  },
  
  create: (req, res) => {
    const novoAluno = req.body;
    const AlunoCriado = AlunosService.create(novoAluno);
    res.status(201).json(AlunoCriado);
  }
};

module.exports = AlunosController;