 const express = require('express')
 const router = express.Router()
 const multer = require('multer')
 const upload = multer();
 const Controller = require('../../controllers/admin/account.controller')
 const Validate = require('../../validates/admin/account.validate')
 const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')
 
 router.get('/', Controller.accounts);
 router.get('/create', Controller.create);
 router.post('/create' ,
    upload.single('avatar') ,
    uploadCloud.upload,
    Validate.createPost,
    Controller.createPost
 ) ;


  module.exports = router;