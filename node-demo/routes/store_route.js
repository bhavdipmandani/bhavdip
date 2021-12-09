const express = require('express')
const router = express.Router()

const product_store_Controller = require('../controllers/productStorecontroller');


router.post("/storeporduct", product_store_Controller.storeporduct);

router.get("/getstoredproduct", product_store_Controller.getstoredproduct);

router.patch("/getstoredproduct/:_id", product_store_Controller.updatesotore);

 
module.exports = router 