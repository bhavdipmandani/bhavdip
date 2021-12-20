const express = require('express')
const router = express.Router()




const {addresscontroller : Controller} = require('../controllers');
// routes for product api ...


router.get("/", Controller.list);

router.get("/listbyId/:_id", Controller.listbyId);

router.post("/", Controller.add);


router.patch("/:_id", Controller.update);

router.delete("/:id", Controller.destroy);


module.exports = router
