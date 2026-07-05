 const express = require('express')
 const router = express.Router()

 const Controller = require('../../controllers/admin/roles.controller')
 router.get('/', Controller.role);

 module.exports = router

 // Xong thêm vào index.route mới có được