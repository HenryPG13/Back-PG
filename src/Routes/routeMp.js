const express = require('express');
const mercadopago = require("mercadopago");
const morgan = require('morgan')

const router = express.Router()


// mercadopago.configure({
//     // access_token: process.env.MERCADOPAGO_KEY,
//     access_token: 'APP_USR-8269958548313683-111714-28a6ab1ef3f707b232e68d8587f5b162-1239620323',
// });
// router.post("/create", (req, res) => {

// 	let preference = {
// 		items: [
// 			{
// 				title: req.body.description,
// 				unit_price: Number(req.body.price),
// 				quantity: Number(req.body.quantity),
// 			}
// 		],
// 		back_urls: {
// 			"success": "http://localhost:3001/pago/feedback",
// 			"failure": "http://localhost:3001/pago/feedback",
// 			"pending": "http://localhost:3001/pago/feedback"
// 		},
// 		auto_return: "approved",
// 	};

// 	mercadopago.preferences.create(preference)
// 		.then(function (response) {
// 			res.json({
// 				id: response.body.id,
// 				init: response.body.init_point
// 			});
// 		}).catch(function (error) {
// 			console.log(error);
// 		});
// });

// router.get('/feedback', function (req, res) {
// 	res.json({
// 		Payment: req.query.payment_id,
// 		Status: req.query.status,
// 		MerchantOrder: req.query.merchant_order_id
// });},)
// -------------------------------------------------------------------------------------------------
mercadopago.configure({
    // access_token: process.env.MERCADOPAGO_KEY,
    access_token: 'APP_USR-8269958548313683-111714-28a6ab1ef3f707b232e68d8587f5b162-1239620323',
    
  });
  router.post('', (req,res) => {
    // res.status(200).send("funciona")
    const product = req.body
    // console.log("ESTO TIENE PRODUCT ", product);
    let preference = {
        items : [{
            id: product._id,             //En nuestro caso seria el id del producto/zapatilla
            modelo: product.modelo, //En nuestro caso seria el modelo de la zapatilla
            imagen: product.imagenes[0], //En nuestro caso seria la imagen del producto
            color: product.color,
            talla: product.talle,
            marca: product.marca,
            unit_price: product.precio,
            descripcion: product.descripcion,
            quantity: 1,
            currency: 'ARS',
        }],
        back_urls:{
           success: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
           failure: '',
           pending: ''
        },
        auto_return: 'approved',
        binary_mode: true,
    }
    mercadopago.preferences.create(preference).then((response)=>
    res.status(200).send({response})).catch((error)=>
     res.status(400).send({error:error.message})) 
  })
  
//   --------------------------- MERCADO PAGO CONFIG---------------
// });

module.exports = router