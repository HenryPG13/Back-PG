const express = require('express');
const mercadopago = require('mercadopago')
require('dotenv').config()

const router = express.Router()

mercadopago.configure({
    access_token: 'APP_USR-5518288478784372-011316-fa53d3454cf122dcfff6a94f697d715c-1286671264'
});

//Esto es una prueba del payment con mercadopago
router.post('/payment', (req, res) => {
    const product = req.body
    let preference = {
        items: [{
            id: product._id,             //En nuestro caso seria el id del producto/zapatilla
            modelo: product.title, //En nuestro caso seria el modelo de la zapatilla
            imagen: product.imagen, //En nuestro caso seria la imagen del producto
            color: product.color,
            talla: product.talla,
            marca: product.marca,
            unit_price: product.precio,
            descripcion: product.descripcion,
            quantity: product.cantidad,
            currency: 'ARS',
        }],
        back_urls: {
            success: 'http:localhost:3001/products/zapatillas',
            failure: '',
            pending: '',
        },
        auto_return: 'approved',
        binary_mode: true,
    }

    mercadopago.preferences.create(preference).then((response) => res.status(200).send({response})).catch((error) => res.status(400).send({error: error.message}));
})

module.exports = router