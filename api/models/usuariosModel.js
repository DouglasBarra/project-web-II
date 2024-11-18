const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    name: { type: String, require: true},
    email: { type: String, require: true},
    user: { type: String, require: true},
    password: { type: String, require: true},
    level: { type: String, require: true},
    status: { type: String, enum: ['ativo', 'inativo'], require: true,}
});

const Usuario = mongoose.model("Usuarios", usuarioSchema);

module.exports = Usuario