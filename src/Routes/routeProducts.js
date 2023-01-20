const express = require('express');
const { model } = require('mongoose');
const zapSchema = require('../Models/modelProducts.js')
//const axios = require('axios')

const router = express.Router()

//Ruta de creacion de productos (zapatillas)
router.post('', async (req, res) => {
    try {
        const newProduct = await zapSchema(req.body);
        await newProduct.save()
        res.send(newProduct)
    } catch (error) {
        res.status(401).send({ error: "error" })
    }
})

//Ruta de obtener todos los productos (zapatillas)
router.get('', async (req, res) => {
    let { modelo } = req.query;
    try {
        //Este condicional busca dentro de todos los productos el que tenga en su modelo la palabra enviada por query por la barra de busqueda
        if (modelo && modelo !== '') {
            const zapatillas = await zapSchema.find();
            const zapasFiltradas = zapatillas.filter(obj => obj.modelo.toLowerCase().includes(modelo.toLowerCase()));

            //console.log("ESTO TIENEN LAS ZAPATILLAS: ", zapasFiltradas);

            if (zapasFiltradas?.length) return res.status(200).send(zapasFiltradas);
            else return res.status(404).send(`El modelo "${modelo}" no existe.`);
        }
        //Este es el caso por defecto que trae todos los productos de la base de datos en caso de no enviar filtros ni busquedas por query
        var allzapatillas = await zapSchema.find();
        res.send(allzapatillas);
    } catch (error) {
        console.log(error.message);
        res.send({ msg: error.message });
    }

})
// router.get('', (req, res) => {
//     zapSchema.find()
//         .then((data) => res.send(data))
//         .catch((e) => res.send({ error: e }))
// })

//Ruta de obtener 1 producto especifico (zapatilla)
router.get('/:id', (req, res) => {
    const { id } = req.params
    zapSchema
        .findById(id)
        .then((data) => res.send(data))
        .catch((e) => res.send({ message: e }));
})

// Ruta de modificar 1 producto especifico (zapatilla)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { actividad, color, imagen1, imagen2, imagen3, marca, modelo, precio, talles } = req.body;
    zapSchema
        .updateOne({ _id: id }, { $set: { actividad, color, imagen1, imagen2, imagen3, marca, modelo, precio, talles } })
        .then((data) => res.send(data))
        .catch((e) => res.send({ message: e }));
})

//Ruta de eliminacion de 1 producto especifico (zapatilla)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    zapSchema
        .remove({ _id: id })
        .then((data) => res.send(data))
        .catch((e) => res.send({ message: e }));
});

//Ruta de postear comentario
router.post('/:id/comentario', async (req, res) => {
    const { calificacion, comentarios, nombre, usuario } = req.body;
    const { id } = req.params
    const product = await zapSchema.findById(id)
    if (product) {
        const alreadyReview = product.revisiones.find(
            (e) => e.usuario.toString() === usuario.toString()
        )
        if (alreadyReview) {
            return res.status(400).send("Ya agregaste una revision a este producto")
        }
        const review = {
            nombre,
            calificacion: Number(calificacion),
            comentarios,
            usuario,
        };

        product.revisiones.push(review);
        product.numRevisiones = product.revisiones.length;
        product.calificacion =
            product.revisiones.reduce((acc, item) => item.calificacion + acc, 0) / product.revisiones.length;

        await product.save();
        res.status(201).json({ mensaje: "revision agregada" })
    } else {
        res.status(404).send("Producto no encontrado")
    }
})

module.exports = router
