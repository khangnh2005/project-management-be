 const express = require('express')
 const router = express.Router() 
 const dashboardController = require('../../controllers/admin/product.controller')
    
 router.get('/', dashboardController.adminProducts); 
 router.patch('/change-status/:status/:id', dashboardController.changeStatus);  
 router.patch('/change-multi', dashboardController.changeMulti);  
 router.delete('/delete/:id', dashboardController.deleteItem);
    
   module.exports = router