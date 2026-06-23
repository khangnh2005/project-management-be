 const express = require('express')
 const router = express.Router() 
 const dashboardController = require('../../controllers/admin/product.controller')
    
 router.get('/', dashboardController.adminProducts); 
 router.patch('/change-status/:status/:id', dashboardController.changeStatus);  
 router.patch('/change-multi', dashboardController.changeMulti);  
 router.delete('/delete/:id', dashboardController.deleteItem);
 router.get('/create' ,dashboardController.create);
 router.post('/create' ,dashboardController.createPost);

  module.exports = router