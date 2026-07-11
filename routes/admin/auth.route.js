 const express = require('express')
 const router = express.Router()
 const Controller = require('../../controllers/admin/auth.controller')
 router.get('/login', Controller.login);
 router.post('/login', Controller.loginPost);
 router.get('/logout', Controller.logout);
 module.exports = router    