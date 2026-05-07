 const express = require('express')
 const router = express.Router() // tạo một router mới để có thể sử dụng được các phương thức của expresss trong file này
const productsController = require('../../controllers/client/products.controller')
    router.get('/', productsController.index);
    

    module.exports = router 