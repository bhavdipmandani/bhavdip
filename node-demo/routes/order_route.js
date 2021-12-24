const express = require('express')
const router = express.Router()

const {orderController : Controller} = require('../controllers');

// router.get("/", Controller.list);

router.post("/", Controller.add);
router.get("/", Controller.list);
router.get('/:id', Controller.userOrder);
// router.patch("/:_id", Controller.update);


module.exports = router 
