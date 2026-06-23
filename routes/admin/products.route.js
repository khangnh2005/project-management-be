 const express = require('express')
 const multer  = require('multer')
 const storageMulter = require("../../helpers/storageMulter")
 const upload = multer({ storage : storageMulter() })
 const router = express.Router() 
 const dashboardController = require('../../controllers/admin/product.controller')
    
 router.get('/', dashboardController.adminProducts); 
 router.patch('/change-status/:status/:id', dashboardController.changeStatus);  
 router.patch('/change-multi', dashboardController.changeMulti);  
 router.delete('/delete/:id', dashboardController.deleteItem);
 router.get('/create' ,dashboardController.create);
 router.post('/create' ,upload.single('thumbnail') , dashboardController.createPost);

  module.exports = router