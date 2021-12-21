const express = require('express')
const router = express.Router()

const {admincontroller : Controller} = require('../controllers');



// const middleware = require('../middlewares')

router.post('/register', Controller.insertData);
// router.post('/update/:id', Controller.updateData);

// router.post('/login',Controller.checkData);
router.post('/admin/login',Controller.checkAdmin);


module.exports = router
