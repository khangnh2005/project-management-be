 const express = require('express')
 const router = express.Router() 
 const multer = require('multer')
 const myAccountController = require('../../controllers/admin/my-account.controller')
  const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')
  const upload = multer()
  router.get('/', myAccountController.index); 
  router.get('/edit', myAccountController.edit); 
  router.patch('/edit',
    upload.single('avatar'),
    uploadCloud.upload,
    myAccountController.editPatch
  ); 

  module.exports = router