const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const routeProducts = require('./Routes/routeProducts.js')
const routeUsers = require('./Routes/routeUsers.js')
const routeFilters = require('./Routes/routeFilters.js')
const uploadImage = require("./uploadImage.js")
const routeMp = require('./Routes/routeMp.js')
const routeOrders = require('./Routes/orderRoutes.js');
const routeReviews = require("./Routes/routeReviews.js")
const routeOfertas = require("./Routes/routeOfertas.js")

const app = express()
const port = process.env.PORT || 3001

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image)
        .then((url) => res.send(url))
        .catch((err) => res.status(500).send(err))
})

app.post("/uploadMultipleImages", (req, res) => {
    uploadImage.uploadMultipleImages(req.body.images)
        .then((urls) => res.send(urls))
        .catch((err) => res.status(500).send(err));
});

app.use('/productos/zapatillas', routeProducts);
app.use('/productos/filtros', routeFilters);
app.use('/usuarios', routeUsers);
app.use('/pedido', routeOrders);
app.use('/payment', routeMp);
app.use('/productos/revisiones', routeReviews)
app.use('/productos/ofertas', routeOfertas)

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('conectado a mongo'))
    .catch((e) => console.log(e))

app.listen(port, console.log(`listening port ${port}`))