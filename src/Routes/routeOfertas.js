const express = require('express');
const zapSchema = require('../Models/modelProducts.js');
const { setOrder } = require('../Services/serviceProducts')

const router = express.Router();

//Ruta para filtrar las zapatillas en oferta
router.get('', async (req, res) => {
    const products = await zapSchema.find();
    let filterOfertas = [];
    products.forEach((e) => {
        if (e.oferta) {
            filterOfertas.push(e)
        }
    });
    return res.send(filterOfertas);
});

module.exports = router