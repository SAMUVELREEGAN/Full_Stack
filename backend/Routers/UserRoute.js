const UserController = require('../Controller/UserController')

const express = require('express')

const UserRouter = express.Router()

UserRouter.post("/register",UserController.register)
UserRouter.post("/login",UserController.login)
UserRouter.get("/userlist",UserController.list)
UserRouter.post("/userremove",UserController.remove)
UserRouter.post("/adminlogin",UserController.adminLogin)

module.exports = UserRouter