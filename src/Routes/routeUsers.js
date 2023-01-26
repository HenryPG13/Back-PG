const express = require('express');
const userSchema = require('../Models/modelUser.js');
const productSchema = require('../Models/modelProducts.js');

const router = express.Router()



//Ruta de creacion de usuarios (users)
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        const usuario = await userSchema.findOne({ email });
        if (usuario) {
            res.json({
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                ciudad: usuario.ciudad,
                pais: usuario.pais,
                direccion: usuario.direccion
            })
        }
        if (!usuario) {
            const newUser = await userSchema(req.body);
            await newUser.save()
            res.send(newUser)
        }
    } catch (error) {
        res.status(400).send({ error: "error" })
    }
});

// Ruta login
router.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;
    const usuario = await userSchema.findOne({ email });
    const constraseña = await userSchema.findOne({ contraseña });
    console.log(usuario.ciudad)
    if (usuario && constraseña) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            admin: usuario.admin,
            estado: usuario.estado,
            createdAt: usuario.createdAt,
            ciudad: usuario.ciudad,
            pais: usuario.pais,
            direccion: usuario.direccion
        })
    } else {
        res.status(401).send("Usuario y/o contraseña invalidos")
    }
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
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, apellido, contraseña, ciudad, pais, admin, estado, direccion } = req.body;
        const user = await userSchema
            .updateOne({ _id: id }, { $set: { nombre, email, apellido, contraseña, ciudad, pais, admin, estado, direccion } })
        res.json(user)
    } catch (error) {
        res.send({ message: e });
    }

});

//Ruta de eliminacion de 1 usuarios especifico (user)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    userSchema
        .remove({ _id: id })
        .then((data) => res.send(data))
        .catch((e) => res.send({ message: e }));
});

//AÑADIR FAVORITOS
router.post('/:idproduct/favorito', async (req, res) => {
    const { idproduct } = req.params;
    const { iduser } = req.query;
    const user = await userSchema.findById(iduser)
    const product = await productSchema.findById(idproduct)

    if (user) {
        if (user.favoritos.length > 0) {
            const alreadyFav = user.favoritos.find(
                (e) => e.modelo.toString() === product.modelo.toString()
            )
            if (alreadyFav) {
                return res.status(400).send("Ya agregaste este producto a favoritos")
            }
        }
        const favorit = {
            actividad: product.actividad,
            color: product.color,
            imagenes: product.imagenes,
            marca: product.marca,
            modelo: product.modelo,
            precio: product.precio,
            talle: product.talle,
            descripcion: product.descripcion,
            producto: idproduct
        };

        user.favoritos.push(favorit);
        await user.save();
        res.status(201).json({ mensaje: "producto agregado a favoritos" })
    } else {
        res.status(404).send("Producto no encontrado")
    }
});

//ELIMINAR FAVORITOS
// router.delete("", async (req, res) => {
//     try {
//         const { producto, id } = req.body;
//         console.log(id, "usuario")
//         const user = await userSchema.findById(id);
//         const revFav = user.favoritos.filter(e => e.producto !== producto)

//         user.favoritos = revFav;
//         await user.save();
//         return res.json(user)
//     } catch (error) {
//         console.log(error)
//     }
// });

//ELIMINAR FAVORITOS
router.delete("/favoritos/:id", async (req, res) => {
    try {
        const { id } = req.params; //ID de producto favorito
        const users = await userSchema.find();
        const singleUser = []
        users.forEach(user => {
            const x = user.favoritos.filter(e => e.producto == id);
            if (x.length > 0) singleUser.push(user)
        });

        const usr = await userSchema.findById(singleUser[0]._id)
        const favUser = usr.favoritos.filter(e => e.producto !== id)
        usr.favoritos = favUser;
        await usr.save();
        return res.status(200).send(usr)
    } catch (error) {
        console.log(error)
    }
});
module.exports = router;
