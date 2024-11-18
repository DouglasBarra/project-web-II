const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventoSchema = new Schema({
    name: { type: String, require: true},
    description: { type: String, require: true},
    comments: { type: String, require: true},
    date: { type: Date, require: true}
});

const Evento = mongoose.model("Eventos", eventoSchema);

module.exports = Evento