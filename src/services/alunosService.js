const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/alunos.json');
const Aluno = require('../models/alunosModel');

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
  },

  update: (id, alunoData) => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const alunos = JSON.parse(data);

    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);

    if (alunoIndex === -1) {
      throw new Error('Aluno não encontrado');
    }

    alunos[alunoIndex] = { ...alunos[alunoIndex], ...alunoData };

    fs.writeFileSync(dbPath, JSON.stringify(alunos, null, 2));
    return alunos[alunoIndex];
  },

  delete: (id) => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const alunos = JSON.parse(data);

    const alunoIndex = alunos.findIndex(aluno => aluno.id === id);

    if (alunoIndex === -1) {
      throw new Error('Aluno não encontrado');
    }

    const alunoRemovido = alunos.splice(alunoIndex, 1);

    fs.writeFileSync(dbPath, JSON.stringify(alunos, null, 2));
    return alunoRemovido;
  }
};

module.exports = AlunosService;