const express = require('express')
const router = express.Router()

const multer = require("multer");
const path = require("path");


const product_Controller = require('../controllers/productcontroller');
// routes for product api ...


const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const add_product_data = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024,
    },
}); 

router.use('/images', express.static('images'));

router.post("/add_product", add_product_data.single('image'), product_Controller.add_product);

router.get("/product_list", product_Controller.product_list);


router.patch("/product_list/:_id", product_Controller.update_product);

router.delete("/product_list/:id", product_Controller.delete_product);





module.exports = router
