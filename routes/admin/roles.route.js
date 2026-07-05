 const express = require('express')
 const router = express.Router()

 const Controller = require('../../controllers/admin/roles.controller')
 router.get('/', Controller.role);
 router.get('/create' , Controller.create);
 router.post('/create' , Controller.createPost);
 router.delete('/delete/:id', Controller.deleteItem);
 router.get('/edit/:id', Controller.edit);
 router.patch('/edit/:id', Controller.editPatch);

 module.exports = router

 // Xong thêm vào index.route mới có được