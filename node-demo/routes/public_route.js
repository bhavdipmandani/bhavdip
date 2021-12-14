const express = require('express')
const router = express.Router();

const {productcontroller} = require('../controllers');
// routes for product api ...

router.get("/product" , productcontroller.list);


module.exports = router
