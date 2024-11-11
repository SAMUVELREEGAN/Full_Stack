const express = require('express')
const auth = require('../Middleware/authMiddle')
const CartController = require('../Controller/CartController')

const cartRouter = express.Router()

cartRouter.post('/add',auth.authUser,CartController.addToCart)
cartRouter.post('/get',auth.authUser,CartController.getUserCart)
cartRouter.post('/update',auth.authUser,CartController.updateCart)

module.exports = cartRouter