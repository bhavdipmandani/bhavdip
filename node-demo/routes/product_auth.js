const express = require('express')
const router = express.Router()

const multer = require("multer");
const path = require("path");


const {productcontroller : Controller} = require('../controllers');
// routes for product api ...


// const storage = multer.diskStorage({
//     destination: './images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// });
//
// const add_product_data = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1 * 1024 * 1024,
//     },
// });


const storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
        // let ext = path.extname(file.originalname)
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

// const add_product_data = multer({
//     storage: storage,
//     fileFilter: function (req, file, callback) {
//         if (
//             file.mimetype == "image/jpg" ||
//             file.mimetype == "image/png"
//         ) {
//             callback(null, true)
//         } else {
//             console.log('only jpg & png file supported');
//             callback(null, false)
//         }
//     },
//     limits: { fileSize: 2 * 1024 * 1024 }
// })


const add_product_data = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


router.use('/images' , express.static('images'));

router.get("/" , Controller.list);

router.post("/" , add_product_data.single('image'), Controller.add);

router.patch("/:_id" , Controller.update);

router.delete("/:id" , Controller.destroy);


module.exports = router
