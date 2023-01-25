const { ObjectId } = require("bson");
const express = require("express");
const zapSchema = require("../Models/modelProducts.js");

const router = express.Router();

//GET ALL REVIEWS
router.get("", async (req, res) => {
    try {
        const products = await zapSchema.find();
        const reviews = products.map(e => e.revisiones);
        const orderReviews = reviews.flat(reviews.length)
        return res.send(orderReviews)
    } catch (error) {
        console.log(error)
    }
});

//DELETE REVIEW

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const products = await zapSchema.find();
        const product = []
        products.forEach(producto => {
            const x = producto.revisiones.filter(e => e._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") == id);
            if (x.length > 0) product.push(producto)
        });

        const pdcto = await zapSchema.findById(product[0]._id)
        const revProd = product[0].revisiones.filter(e => e._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") !== id)

        pdcto.revisiones = revProd;
        await pdcto.save();
        return res.status(200).send(pdcto)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;