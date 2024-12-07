const mongoose = require('mongoose');
const { Schema } = mongoose;

const profissionalSchema = new Schema({
  name: { type: String, require: true },
  specialty: { type: String, require: true },
  contact: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  status: { type: String, require: true }
})

const Profissional = mongoose.model("Profissionais", profissionalSchema);

module.exports = Profissional