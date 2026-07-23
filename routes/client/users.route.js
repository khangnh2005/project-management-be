const express = require('express')
const route = express.Router()
const usersController = require("../../controllers/client/users.controller.js")

route.get('/not-friend', usersController.notFriend)
route.get('/friends', usersController.friends)
route.get('/request', usersController.request)
route.get('/accept', usersController.accept)



module.exports = route