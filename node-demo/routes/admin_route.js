const express = require('express')
const router = express.Router()

const {admincontroller : Controller} = require('../controllers');



const middleware = require('../middlewares')

router.get("/admin_data", middleware.verify, Controller.list);

router.post('/admin_login', Controller.login);

router.post('/admin_register' , Controller.register);










module.exports = router
