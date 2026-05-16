 const express = require('express')
 const router = express.Router() 
 const dashboardController = require('../../controllers/admin/product.controller')
    
 router.get('/', dashboardController.adminProducts); 
 router.patch('/change-status/:status/:id', dashboardController.changeStatus);  

    
   module.exports = router