const { connectToDatabase, closeDatabaseConnection } = require('../config/database');
const Aluno = require('../models/alunosModel');

const AlunosService = {
  getAll: async () => {
    try {
      const db = await connectToDatabase();
      const collection = db.collection('alunos');
      const alunos = await collection.find().toArray();
      return alunos;
    } catch (error) {

    } finally {
      closeDatabaseConnection();
    }
  },

  create: async (alunoData) => {
    const db = await connectToDatabase();
    const collection = db.collection('alunos');

    try {
      const novoAluno = new Aluno(
        alunoData.name,
        alunoData.age,
        alunoData.parents,
        alunoData.phoneNumber,
        alunoData.specialNeeds,
        alunoData.status
      );

      const result = await collection.insertOne(novoAluno);
      const alunoCriado = await collection.findOne({ _id: result.insertedId })
      return alunoCriado;
    } catch (error) {

    } finally {
      closeDatabaseConnection();
    }
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