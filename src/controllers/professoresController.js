const ProfessoresService = require('../services/professoresService.js');

const ProfessoresController = {
  getAll: (req, res) => {
    try {
      const professores = ProfessoresService.getAll();
      res.json(professores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar professores.' });
    }
  },
  
  create: (req, res) => {
    try {
      const novoProfessor = req.body;
      const professorCriado = ProfessoresService.create(novoProfessor);
      res.status(200).json(professorCriado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar professor.' });
    }
  },

  update: (req, res) => {
    try {
      const id = req.params.id;
      const dadosAtualizados = req.body;
      const professorAtualizado = ProfessoresService.update(id, dadosAtualizados);
      res.status(200).json(professorAtualizado);
    } catch (error) {
      if (error.message === 'Professor não encontrado') {
        res.status(404).json({ error: 'Professor não encontrado.' });
      } else {
        res.status(500).json({ error: 'Erro ao atualizar professor.' });
      }
    }
  },

  delete: (req, res) => {
    try {
      const id = req.params.id;
      const professorRemovido = ProfessoresService.delete(id);
      res.json({ message: 'Professor removido com sucesso.', professor: professorRemovido });
    } catch (error) {
      if (error.message === 'Professor não encontrado') {
        res.status(404).json({ error: 'Professor não encontrado.' });
      } else {
        res.status(500).json({ error: 'Erro ao deletar professor.' });
      }
    }
  }
};

module.exports = ProfessoresController;