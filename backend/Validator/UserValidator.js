const UserModel = require('../Model/UserModel')
const {body} = require('express-validator')

exports.insert = [
    body("email").trim().isEmail().withMessage("Give a proper email address"),
]