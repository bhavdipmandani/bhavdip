const express = require('express')
const router = express.Router()

const multer = require("multer");
const upload = multer();
const path = require("path");


const userController = require('../controllers/usercontroller');



const middleware = require('../middlewares')

router.post('/login', userController.login);

router.post('/register' , userController.register);

router.get("/listdata", middleware.verify, userController.listdata);








module.exports = router
