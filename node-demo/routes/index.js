const express = require('express')
const router = express.Router()
const Authenticate = require('../middlewares')


const user_Route = require('./user_auth')
const product_Route = require('./product_auth')
const Admin_Route = require('./admin_route')
const Store_Route = require('./store_route')
const Address_Route = require('./address_route')
const Public_Route = require('./public_route')
const Order_Route = require('./order_route')



router.use('/auth', user_Route)
router.use('/auth', Admin_Route)
router.use('/store', Store_Route)
router.use('/address', Address_Route)
router.use('/public', Public_Route)



router.use(Authenticate)
router.use('/product', product_Route)
router.use('/order', Order_Route)

module.exports = router;

