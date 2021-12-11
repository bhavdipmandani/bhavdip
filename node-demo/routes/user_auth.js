const express = require('express')
const router = express.Router()

const multer = require("multer");
const upload = multer();
const path = require("path");


const {usercontroller : Controller} = require('../controllers');



const middleware = require('../middlewares')

router.post('/login', Controller.login);

router.post('/register' , Controller.register);

router.get("/", middleware.verify, Controller.list);








module.exports = router
