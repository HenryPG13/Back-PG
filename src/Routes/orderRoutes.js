const express = require('express');
const Order = require('../Models/orderModel.js');

const orderRouter = express.Router();

//CREATE ORDER
orderRouter.post('/', async (req, res) => {
    const {
        usuario,
        orderItems,
        direccionEntrega,
        metodoDePago,
        precioProducto,
        precioEnvio,
        precioTotal
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).send("No order items");
    }

    else {
        const order = new Order({
            usuario,
            orderItems,
            direccionEntrega,
            precioProducto,
            metodoDePago,
            precioEnvio,
            precioTotal
        });

        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
});

// GET ORDER BY ID
orderRouter.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        res.json(order);
    }
    else {
        res.status(401).send("Order not found");
    }
});

// // ORDER IS PAID
orderRouter.put('/:id/pay', async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.estadoPago = true;
        order.fechaPago = "AGREGAR FUNCION CON FECHA ACTUAL"
        order.resultadoDePago = {
            id: req.body.id,
            estado: req.body.estado,
            fechaDePago: req.body.fechaDePago,
            email: req.body.email,
        }

        const updateOrder = await order.save();
        res.json(updateOrder)
    }
    else {
        res.status(401).send("Order not found");
    }
});

module.exports = orderRouter