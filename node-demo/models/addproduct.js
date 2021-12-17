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


module.exports = new mongoose.model("Product", productSchema) 
