const ProductController = require('../Controller/ProductController')

const express = require('express')

const ProductRouter = express.Router()

ProductRouter.post("/addproduct",ProductController.insert)
ProductRouter.get("/listproduct",ProductController.list)
ProductRouter.post("/removeproduct",ProductController.remove)

module.exports = ProductRouter