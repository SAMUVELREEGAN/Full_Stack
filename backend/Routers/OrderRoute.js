const express = require('express')
const OrderController = require('../Controller/OderController')
const auth = require('../Middleware/authMiddle')

const OrderRouter = express.Router()

OrderRouter.post('/list',OrderController.allOrders)
OrderRouter.post('/status',OrderController.updateStatus)

OrderRouter.post('/userorders',auth.authUser,OrderController.userOrders)

OrderRouter.post('/place',auth.authUser,OrderController.placeOrder)

module.exports = OrderRouter