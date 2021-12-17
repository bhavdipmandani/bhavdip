const express = require('express')
const router = express.Router()

const {productStorecontroller : Controller} = require('../controllers');

router.get("/", Controller.list);

router.post("/", Controller.add);

router.patch("/:_id", Controller.update);

 
module.exports = router 
