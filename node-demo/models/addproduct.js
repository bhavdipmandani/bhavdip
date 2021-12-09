const mongoose = require("mongoose")
const multer = require("multer");
const path = require("path");

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true
    },
    image: {
        type: String,
        data: Buffer,
        contentType: String
      },
    description: {
          type: String,
          required: true
    },
    price: {
        type: Number,
        required: true
    },
})
const storage = multer.diskStorage({
    destination: './images',
     filename: ( file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const add_product_data = multer({  
    storage: storage, 
    limits: {
        fileSize: 1 * 1024 * 1024,
    },
}); 

module.exports = new mongoose.model("Product", productSchema) 