 const express = require('express')
 const router = express.Router()

 //  const storageMulter = require("../../helpers/storageMulter")
 const multer = require('multer')
 const upload = multer();
 const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')

 const Controller = require('../../controllers/admin/product-category.controller')
 const Validate = require('../../validates/admin/product-category.validate')

 router.get('/', Controller.index);
 router.get('/create', Controller.create);
 router.post('/create',
     upload.single('thumbnail'),
     uploadCloud.upload,
    //  Validate.createPost,
     Controller.createPost
 );


 module.exports = router