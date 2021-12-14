const express = require('express')
const router = express.Router()

const multer = require("multer");
const path = require("path");


const {productcontroller : Controller} = require('../controllers');
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

router.use('/images' , express.static('images'));

router.get("/" , Controller.list);

router.post("/" , add_product_data.single('image'), Controller.add);

router.patch("/:_id" , Controller.update);

router.delete("/:id" , Controller.destroy);


module.exports = router
