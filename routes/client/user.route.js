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
route.post('/login'  , 
    validate.loginPost,
    userController.loginPost
)

route.get('/logout', userController.logout)


module.exports = route