 const express = require('express')
 const router = express.Router()
 const Controller = require('../../controllers/admin/settings.controller')

  const multer = require('multer')
  const upload = multer();
  const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')
 
 router.get('/general', Controller.index);
 router.patch('/general', 
    upload.single('logo'),
    uploadCloud.upload,
    Controller.generalPatch);
 module.exports = router