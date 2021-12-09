const express = require('express')
const router = express.Router()




const address_Controller = require('../controllers/addresscontroller');
// routes for product api ...



router.post("/add_address", address_Controller.add_address);

router.get("/address_list", address_Controller.address_list);


router.patch("/address_list/:_id", address_Controller.update_address);

router.delete("/address_list/:id", address_Controller.delete_address);





module.exports = router
