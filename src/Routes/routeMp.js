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
  router.post('/single', (req,res) => {
    // res.status(200).send("funciona")
    const products = req.body

    const chequeoInv = products.map(prods => { return { ...prods, inventario: prods.inventario - prods.qty } });

    const articulos = chequeoInv.map(prods => { return { id: prods._id, picture_url: prods.imagenes[0], category_id: "fashion", title: prods.modelo, unit_price: prods.precio, description: prods.descripcion, quantity: 1, currency_id: "ARS" } });

    
    // console.log("ESTO TIENE ARTICULOS ", articulos);
    
    const preference = {
      items: articulos,
      back_urls: {
        success: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        failure: "",
        pending: "",
      },
      auto_return: "approved",
      binary_mode: true,
    };
    // preference = {
    //   items: [
    //     {
    //       id: product[0]._id, //En nuestro caso seria el id del producto/zapatilla
    //       title: product[0].modelo, //En nuestro caso seria el modelo de la zapatilla
    //       picture_url: product[0].imagenes && product[0].imagenes[0], //En nuestro caso seria la imagen del producto
    //       color: product[0].color,
    //       talla: product[0].talle,
    //       category_id: "fashion",
    //       unit_price: product[0].precio,
    //       description: product[0].descripcion,
    //       quantity: product[0].qty,
    //       currency_id: "ARS",
    //     },
    //   ],
    //   back_urls: {
    //     success: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    //     failure: "",
    //     pending: "",
    //   },
    //   auto_return: "approved",
    //   binary_mode: true,
    // };
    
    mercadopago.preferences.create(preference).then((response)=>
    res.status(200).send({response})).catch((error)=>
     res.status(400).send({error:error.message})) 
  })
  
  //   --------------------------- MERCADO PAGO CONFIG---------------
  router.post('', (req,res) => {
    // res.status(200).send("funciona")
    const products = req.body

    const chequeoInv = products.map(prods => { return { ...prods, inventario: prods.inventario - prods.qty } });

    const articulos = chequeoInv.map(prods => { return { id: prods._id, picture_url: prods.imagenes[0], category_id: "fashion", title: prods.modelo, unit_price: prods.precio, description: prods.descripcion, quantity: prods.qty, currency_id: "ARS" } });

    
    // console.log("ESTO TIENE ARTICULOS ", articulos);
    
    const preference = {
      items: articulos,
      back_urls: {
        success: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        failure: "",
        pending: "",
      },
      auto_return: "approved",
      binary_mode: true,
    };
    // preference = {
    //   items: [
    //     {
    //       id: product[0]._id, //En nuestro caso seria el id del producto/zapatilla
    //       title: product[0].modelo, //En nuestro caso seria el modelo de la zapatilla
    //       picture_url: product[0].imagenes && product[0].imagenes[0], //En nuestro caso seria la imagen del producto
    //       color: product[0].color,
    //       talla: product[0].talle,
    //       category_id: "fashion",
    //       unit_price: product[0].precio,
    //       description: product[0].descripcion,
    //       quantity: product[0].qty,
    //       currency_id: "ARS",
    //     },
    //   ],
    //   back_urls: {
    //     success: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    //     failure: "",
    //     pending: "",
    //   },
    //   auto_return: "approved",
    //   binary_mode: true,
    // };
    
    mercadopago.preferences.create(preference).then((response)=>
    res.status(200).send({response})).catch((error)=>
     res.status(400).send({error:error.message})) 
  })
// });

module.exports = router