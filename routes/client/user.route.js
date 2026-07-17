const express = require('express')
const route = express.Router()
const userController = require("../../controllers/client/user.controller.js")
const validate = require("../../validates/client/user.validate.js")
route.get('/login', userController.login)

route.get('/register', userController.register)
route.post('/register'  , 
    validate.registerPost,
    userController.registerPost
)

module.exports = route