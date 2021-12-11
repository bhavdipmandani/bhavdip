const express = require('express')
const router = express.Router()




const {addresscontroller : Controller} = require('../controllers');
// routes for product api ...


router.get("/", Controller.list);

router.post("/", Controller.add);


router.patch("/:id", Controller.update);

router.delete("/:id", Controller.destroy);





module.exports = router
