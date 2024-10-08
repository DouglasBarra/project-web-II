const ProfissionaisService = require('../services/profissionaisService.js');

const ProfissionaisController = {
  getAll: (req, res) => {
    try {
      const profissionais = ProfissionaisService.getAll();
      res.json(profissionais);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar profissionais.' });
    }
  },
  
  create: (req, res) => {
    try {
      const novoProfissional = req.body;
      const profissionalCriado = ProfissionaisService.create(novoProfissional);
      res.status(200).json(profissionalCriado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar profissional.' });
    }
  },

  update: (req, res) => {
    try {
      const id = req.params.id;
      const dadosAtualizados = req.body;
      const profissionalAtualizado = ProfissionaisService.update(id, dadosAtualizados);
      res.json(profissionalAtualizado);
    } catch (error) {
      if (error.message === 'Profissional não encontrado') {
        res.status(404).json({ error: 'Profissional não encontrado.' });
      } else {
        res.status(500).json({ error: 'Erro ao atualizar profissional.' });
      }
    }
  },

  delete: (req, res) => {
    try {
      const id = req.params.id;
      const profissionalRemovido = ProfissionaisService.delete(id);
      res.json({ message: 'Profissional removido com sucesso.', profissional: profissionalRemovido });
    } catch (error) {
      if (error.message === 'Profissional não encontrado') {
        res.status(404).json({ error: 'Profissional não encontrado.' });
      } else {
        res.status(500).json({ error: 'Erro ao deletar profissional.' });
      }
    }
  }
};

module.exports = ProfissionaisController;