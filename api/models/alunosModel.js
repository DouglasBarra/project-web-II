const mongoose = require('mongoose');
const { Schema } = mongoose;

const alunoSchema = new Schema({
    name: { type: String, require: true },
    age: { type: Number, require: true },
    parents: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    specialNeeds: { type: String, require: true },
    status: { type: String, require: true, default: 'on'}
});

const Aluno = mongoose.model("Alunos", alunoSchema);

module.exports = Aluno