const mongoose = require ('mongoose');

const reviewSchema = mongoose.Schema ({
    nombre:{
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    comentarios: {
        type:String,
        required: true
    },
    usuario: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: "usuarios"
    }
});

module.exports = reviewSchema