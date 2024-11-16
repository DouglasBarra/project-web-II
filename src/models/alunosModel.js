const mongoose = require('mongoose');
const { Schema } = mongoose;

const { v4: uuidv4 } = require('uuid');

const alunoSchema = new Schema({
    name: { type: String, require: true },
    age: { type: Number, require: true },
    parents: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    specialNeeds: { type: String, require: true },
    status: { type: String, require: true}
});

const Aluno = mongoose.model("Aluno", alunoSchema);

module.exports = Aluno