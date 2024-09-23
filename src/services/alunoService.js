const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/alunos.json');
const Aluno = require('../models/alunoModel');

const AlunosService = {
  getAll: () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  },

  create: (alunoData) => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const alunos = JSON.parse(data);

    const novoAluno = new Aluno(
      alunoData.name,
      alunoData.age,
      alunoData.parents,
      alunoData.phoneNumber,
      alunoData.specialNeeds,
      alunoData.status
    );
    
    alunos.push(novoAluno);

    fs.writeFileSync(dbPath, JSON.stringify(alunos, null, 2));
    return novoAluno;
  }
};

module.exports = AlunosService;