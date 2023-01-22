const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    apellido: {
        type: String,
    },
    contraseña: {
        type: String,
        required: true,
        select: false
    },
    favoritos: {
        type: Array
    },
    ciudad: {
        type: String,
    },
    pais: {
        type: String,
    },
    direccion: {
        type: String,
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('usuarios', userSchema);