const ProfissionaisModel = require("../models/profissionaisModel");

const ProfissionaisController = {
  get: async (req, res) => {
    try {
      const id = req.params.id
      const Profissional = await ProfissionaisModel.findById(id);
      if (!Profissional) {
        res.status(404).json({ msg: "Profissional não encontrado!" });
        return;
      }
      res.json(Profissional);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const profissionais = await ProfissionaisModel.find();
      res.json(profissionais);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const Profissional = {
        name: req.body.name,
        specialty: req.body.specialty,
        contact: req.body.contact,
        phoneNumber: req.body.phoneNumber,
        status: req.body.status
      }
      const response = await ProfissionaisModel.create(Profissional);
      res.status(200).json({ response, msg: "Profissional criado com sucesso!" });
    } catch (error) {
      res.status(500);
      console.log(error)
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      const Profissional = {
        name: req.body.name,
        specialty: req.body.specialty,
        contact: req.body.contact,
        phoneNumber: req.body.phoneNumber,
        status: req.body.status
      }
      const updatedProfissional = await ProfissionaisModel.findByIdAndUpdate(id, Profissional);

      if (!updatedProfissional) {
        res.status(404).json({ msg: "Profissional não encontrado!" });
        return;
      }
      res.status(200).json({ Profissional, msg: "Profissional atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: 'Profissional não encontrado ou erro ao atualizar', error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const Profissional = await ProfissionaisModel.findById(id);

      if (!Profissional) {
        res.status(404).json({ msg: "Profissional não encontrado!" });
        return;
      }

      const deletedProfissional = await ProfissionaisModel.findByIdAndDelete(id);
      res.status(200).json({ deletedProfissional, msg: "Profissional removido com sucesso!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = ProfissionaisController;