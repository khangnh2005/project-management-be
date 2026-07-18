const express = require('express')
const route = express.Router()
const userController = require("../../controllers/client/user.controller.js")
const validate = require("../../validates/client/user.validate.js")
const authMiddleware = require("../../middlewares/client/auth.middleware.js")
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
route.get('/password/forgot', userController.forgotPassword)
route.post('/password/forgot', 
    validate.forgotPasswordPost,
    userController.forgotPasswordPost
)
route.get('/password/otp', userController.otpPassword)
route.post('/password/otp', userController.otpPasswordPost)
route.get('/password/reset', userController.resetPassword)
route.post('/password/reset', 
    validate.confirmPasswordPost,
    userController.resetPasswordPost
)
route.get('/info',
    authMiddleware.requireAuth,
    userController.info
)



module.exports = route