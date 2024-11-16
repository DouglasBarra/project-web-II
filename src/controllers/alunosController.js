const AlunoModel = require("../models/alunosModel"); 

const AlunosController = {
  get: async (req, res) => {
    try {
      const id = req.params.id
      const Aluno = await AlunoModel.findById(id);

      if(!Aluno){
        res.status(404).json({ msg: "Aluno não encontrado!"});
        return;
      } 
      res.json(Aluno);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const Alunos = await AlunoModel.find();
      res.json(Alunos);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const novoAluno = {
          name: req.body.name,
          age: req.body.age,
          parents: req.body.parents,
          phoneNumber: req.body.phoneNumber,
          specialNeeds: req.body.specialNeeds,
          status: req.body.status
      }
      const response = await AlunoModel.create(novoAluno);
      res.status(201).json({response, msg: "Aluno criado com sucesso!" })
    } catch (error) {
      res.status(500);
      console.log(error)
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id; 
      
      const Aluno = {
        name: req.body.name,
        age: req.body.age,
        parents: req.body.parents,
        phoneNumber: req.body.phoneNumber,
        specialNeeds: req.body.specialNeeds,
        status: req.body.status
      }
      const updatedAluno = await AlunoModel.findByIdAndUpdate(id, Aluno);

      if(!updatedAluno){
        res.status(404).json({ msg: "Aluno não encontrado!"});
        return;
      }
      
      res.status(200).json({Aluno, msg: "Aluno atualizado com sucesso!"});
    } catch (error) {
      res.status(404).json({ message: 'Aluno não encontrado ou erro ao atualizar', error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id; 
      const Aluno = await AlunoModel.findById(id);

      if(!Aluno){
        res.status(404).json({ msg: "Aluno não encontrado!"});
        return;
      } 

      const deletedAluno = await AlunoModel.findByIdAndDelete(id);
      res.status(200).json({ deletedAluno, msg: "Aluno removido com sucesso!"});
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = AlunosController;