const express = require("express");
const productSchema = require("../Models/modelProducts.js")

const router = express.Router();

//GET ALL REVIEWS
router.get("", async (req, res) => {
    try {
        const products = await productSchema.find();
        const reviews = products.map(e => e.revisiones);
        const orderReviews = reviews.flat(reviews.length)
        res.send(orderReviews)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;