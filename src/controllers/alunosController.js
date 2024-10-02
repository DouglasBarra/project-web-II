const AlunosService = require('../services/alunosService.js');

const AlunosController = {
  getAll: (req, res) => {
    try {
      const alunos = AlunosService.getAll();
      res.json(alunos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar alunos', error: error.message });
    }
  },

  create: (req, res) => {
    try {
      const novoAluno = req.body;
      const AlunoCriado = AlunosService.create(novoAluno);
      res.status(201).json(AlunoCriado);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar aluno', error: error.message });
    }
  },

  update: (req, res) => {
    try {
      const id = req.params.id; 
      const alunoData = req.body; 
      const alunoAtualizado = AlunosService.update(id, alunoData);
      res.json(alunoAtualizado);
    } catch (error) {
      res.status(404).json({ message: 'Aluno não encontrado ou erro ao atualizar', error: error.message });
    }
  },

  delete: (req, res) => {
    try {
      const id = req.params.id; 
      const alunoRemovido = AlunosService.delete(id);
      res.json({ message: 'Aluno removido com sucesso', aluno: alunoRemovido });
    } catch (error) {
      res.status(404).json({ message: 'Aluno não encontrado ou erro ao deletar', error: error.message });
    }
  }
};

module.exports = AlunosController;