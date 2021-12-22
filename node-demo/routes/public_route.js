const express = require('express')
const router = express.Router();

const {productcontroller} = require('../controllers');
const {orderController} = require('../controllers');
// routes for product api ...

router.get("/product" , productcontroller.list);
router.get("/product/:_id" , productcontroller.productList1);



module.exports = router
