const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "usuarios"
    },
    orderItems: [
        {
            marca: { type: String, required: true },
            modelo: { type: String, required: true },
            cantidad: { type: Number, required: true },
            precio: { type: Number, required: true },
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "zapatillas"
            },
        },
    ],
    direccionEntrega: {
        direccion: {type: String, required: true},
        ciudad: {type: String, required: true},
        codigoPostal: {type: String, required: true},
        pais: {type: String, required: true},
    },
    metodoDePago: {
        type: String,
        required: true,
        default: "mercadopago"
    },
    precioTotal: {
        type: Number,
        required: true,
        default: 0.0,
    },
    estadoPago: {
        type: String,
        required: true,
        default: "pending"
    },
    fechaCreacion: {
        type: String
    },
    estadoEntrega:{
        type: Boolean,
        required: true,
        default: false
    },
},
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;