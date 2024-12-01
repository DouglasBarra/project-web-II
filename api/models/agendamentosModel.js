const mongoose = require('mongoose');
const { Schema } = mongoose;

const AgendamentoSchema = new Schema({
  code_number: { type: String, require: true },
  description: { type: String, require: true },
  scheduled_date: { type: Date, require: true },
  profissional: { type: Schema.Types.ObjectId, ref: 'Profissional' }
})

const Agendamento = mongoose.model("Agendamentos", AgendamentoSchema);

module.exports = Agendamento