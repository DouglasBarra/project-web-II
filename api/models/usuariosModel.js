const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    name: { type: String, require: true},
    email: { type: String, require: true},
    user: { type: String, require: false},
    password: { type: String, require: true},
    level: { type: String, enum: ['admin', 'user'], require: true},
    status: { type: String, enum: ['on', 'off'], require: true,}
});

const Usuario = mongoose.model("Usuarios", usuarioSchema);

module.exports = Usuario