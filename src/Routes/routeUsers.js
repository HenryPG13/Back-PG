const express = require('express')
const userSchema = require('../Models/modelUser.js')

const router = express.Router()

//Ruta de creacion de usuarios (users)
router.post('/', async (req, res) => {
    try {
        const newProduct = await userSchema(req.body);
        await newProduct.save()
        res.send(newProduct)
    } catch (error) {
        res.status(401).send({ error: "error" })
    }
});

// Ruta login
router.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;
    const usuario = await userSchema.findOne({ email });
    const constraseña = await userSchema.findOne({ contraseña });

    if (usuario && constraseña) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            admin: usuario.admin,
            estado: usuario.estado,
            createdAt: usuario.createdAt
        })
    } else {
        res.status(401).send("Usuario y/o contraseña invalidos")    }
});

//Ruta de obtener todos los usuarios (users)
router.get('/', (req, res) => {
    userSchema.find()
        .then((data) => res.send(data))
        .catch((e) => res.send({ error: e }))
});

//Ruta de obtener 1 usuarios especifico (user)
router.get('/:id', (req, res) => {
    const { id } = req.params
    userSchema
        .findById(id)
        .then((data) => res.send(data))
        .catch((e) => res.send({ message: e }));
});

// Ruta de modificar 1 usuarios especifico (user)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email, appelido, cumpleaños, contraseña, ciudad, pais, admin } = req.body;
    userSchema
        .updateOne({ _id: id }, { $set: { nombre, email, appelido, cumpleaños, contraseña, ciudad, pais, admin } })
        .then((data) => res.send(data))
        .catch((e) => res.send({ message: e }));
});

//Ruta de eliminacion de 1 usuarios especifico (user)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    userSchema
        .remove({ _id: id })
        .then((data) => res.send(data))
        .catch((e) => res.send({ message: e }));
});

module.exports = router
