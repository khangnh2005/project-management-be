 const express = require('express')
 const multer  = require('multer')
 const storageMulter = require("../../helpers/storageMulter")
 const upload = multer({ storage : storageMulter() })
 const router = express.Router() 
 const Controller = require('../../controllers/admin/product.controller')
 const Validate = require('../../validates/admin/product.validate')


 router.get('/', Controller.adminProducts); 
 router.patch('/change-status/:status/:id', Controller.changeStatus);  
 router.patch('/change-multi', Controller.changeMulti);  
 router.delete('/delete/:id', Controller.deleteItem);
 router.get('/create' ,Controller.create);
 router.post('/create' ,
    upload.single('thumbnail') ,
    Validate.createPost,
    Controller.createPost,
    
 );

  module.exports = router