const express = require('express');
const zapSchema = require('../Models/modelProducts.js');
const { setOrder } = require('../Services/serviceProducts')

const router = express.Router();

//Ruta para filtrar de manera combinada las zapatillas por talla, actividad y precio/
router.get('', async (req, res) => {

    const products = await zapSchema.find();
    const { precio, talle, actividad, order } = req.query;
    let filterProducts = [];

    if (!precio && !talle && !actividad) {
        if (order !== 'default') {
            const orderedProducts = await setOrder(products, order !== 'default' && order ? order : null);
            return res.send(orderedProducts);
        }
        return res.send(products);
    };

    if (precio && talle && actividad) {
        products.forEach((e) => {
            if (e.precio <= precio && e.talle === talle && e.actividad.toLowerCase() === actividad.toLocaleLowerCase()) {
                filterProducts.push(e)
            }
        })
        if (order !== 'default') {
            const orderedProducts = await setOrder(filterProducts, order !== 'default' && order ? order : null);
            return res.send(orderedProducts);
        }
        return res.send(filterProducts);
    };

    if (precio && talle) {
        products.forEach((e) => {
            if (e.precio <= precio && e.talle === talle) {
                filterProducts.push(e)
            }
        })
        if (order !== 'default') {
            const orderedProducts = await setOrder(filterProducts, order !== 'default' && order ? order : null);
            return res.send(orderedProducts);
        }
        return res.send(filterProducts);
    };

    if (precio && actividad) {
        products.forEach((e) => {
            if (e.precio <= precio && e.actividad.toLowerCase() === actividad.toLocaleLowerCase()) {
                filterProducts.push(e)
            }
        })
        if (order !== 'default') {
            const orderedProducts = await setOrder(filterProducts, order !== 'default' && order ? order : null);
            return res.send(orderedProducts);
        }
        return res.send(filterProducts);
    };

    if (talle && actividad) {
        products.forEach((e) => {
            if (e.talle === talle && e.actividad.toLowerCase() === actividad.toLocaleLowerCase()) {
                filterProducts.push(e)
            }
        })
        if (order !== 'default') {
            const orderedProducts = await setOrder(filterProducts, order !== 'default' && order ? order : null);
            return res.send(orderedProducts);
        }
        return res.send(filterProducts);
    };

    if (precio) {
        products.forEach((e) => {
            if (e.precio <= precio) {
                filterProducts.push(e)
            }
        })
        if (order !== 'default') {
            const orderedProducts = await setOrder(filterProducts, order !== 'default' && order ? order : null);
            return res.send(orderedProducts);
        }
        return res.send(filterProducts);
    };

    if (talle) {
        products.forEach((e) => {

            if (e.talle == talle) {
                filterProducts.push(e)
            }
        })
        if (order !== 'default') {
            const orderedProducts = await setOrder(filterProducts, order !== 'default' && order ? order : null);
            return res.send(orderedProducts);
        }
        res.send(filterProducts);
    };

    if (actividad) {
        products.forEach((e) => {
            if (e.actividad.toLowerCase() === actividad.toLocaleLowerCase()) {
                filterProducts.push(e)
            }
        })
        if (order !== 'default') {
            const orderedProducts = await setOrder(filterProducts, order !== 'default' && order ? order : null);
            // console.log("ENTRE AL LOG", orderedProducts[0], orderedProducts[3], orderedProducts[5],);
            return res.send(orderedProducts);
        }
        return res.send(filterProducts);
    };
    
});

module.exports = router