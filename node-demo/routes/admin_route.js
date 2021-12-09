const express = require('express')
const router = express.Router()


const adminController = require('../controllers/admincontroller');



const middleware = require('../middlewares')

router.post('/admin_login', adminController.login);

router.post('/admin_register' , adminController.register);

router.get("/admin_data", middleware.verify, adminController.listdata);








module.exports = router
