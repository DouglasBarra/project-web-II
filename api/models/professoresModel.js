const mongoose = require('mongoose');
const { Schema } = mongoose;

const professorSchema = new Schema({
    name: { type: String, require: true },
    schoolDisciplines: { type: String, require: true },
    contact: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    status: { type: String, require: true }
})

const Professor = mongoose.model("Professores", professorSchema);

module.exports = Professor;