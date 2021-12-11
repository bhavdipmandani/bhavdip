const express = require('express')
const router = express.Router()

const user_Route = require('./user_auth')
const product_Route = require('./product_auth')
const Admin_Route = require('./admin_route')
const Store_Route = require('./store_route')
const Address_Route = require('./address_route')

router.use('/auth', user_Route)
router.use('/product', product_Route)
router.use('/adminauth', Admin_Route)
router.use('/store', Store_Route)
router.use('/address', Address_Route)

module.exports = router;

