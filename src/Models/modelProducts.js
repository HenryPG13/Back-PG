const mongoose = require('mongoose')
const reviewSchema = require("./modelReviews.js")

const zapSchema = mongoose.Schema({
    actividad: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    imagenes: {
        type: Array,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: false
    },
    precio: {
        type: Number,
        required: true
    },
    talle: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    revisiones: [reviewSchema],
    numRevisiones: {
        type: Number,
        required: true,
        default: 0
    },
    calificacion: {
        type: Number,
        required: true,
        default: 0
    },
    inventario: {
        type: Number,
        required: true,
        default: 1
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    oferta: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true
    });

module.exports = mongoose.model('zapatillas', zapSchema);