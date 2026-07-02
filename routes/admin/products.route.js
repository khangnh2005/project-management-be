 const express = require('express')
 const multer = require('multer')
 //  const storageMulter = require("../../helpers/storageMulter")

 const upload = multer(    
   {
        limits: {
            fieldSize: 10 * 1024 * 1024 
        }
    }
);

 const router = express.Router()
 const Controller = require('../../controllers/admin/product.controller')
 const Validate = require('../../validates/admin/product.validate')
 const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')
 router.get('/', Controller.adminProducts);
 router.patch('/change-status/:status/:id', Controller.changeStatus);
 router.patch('/change-multi', Controller.changeMulti);
 router.delete('/delete/:id', Controller.deleteItem);
 router.get('/create', Controller.create);
 router.post('/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
    Validate.createPost,
    Controller.createPost,

 );
 router.get(`/edit/:id`, Controller.edit)
 router.patch(`/edit/:id`,
    upload.single('thumbnail'), // Không có cái này là lỗi 
    uploadCloud.upload,
    Validate.createPost,
    Controller.editPatch,
 )
 router.get(`/detail/:id`, Controller.detail)
 
 module.exports = router