const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    comentarios: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "usuarios"
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "zapatillas"
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    }
},
    {
        timestamps: true
    });

module.exports = reviewSchema