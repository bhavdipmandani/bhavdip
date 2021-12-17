const mongoose = require("mongoose")
// const schema = mongoose.Schema;

const product_store = new mongoose.Schema({

    // product_data: {
    //       products:[{  type: mongoose.Schema.Types.ObjectId,
    //         // type: 'ObjectId',
    //         ref: 'Product',
    //       }],
    //     users: [{
    //         type: mongoose.Schema.Types.ObjectId,
    //         // type: 'ObjectId', sddd
    //         ref: 'User',
    //     }],
    //     },
    // productData: {
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            // type: 'ObjectId',
            ref: 'Product',
        }],
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            // type: 'ObjectId',
            ref: 'User',
        }],
    // }
})

module.exports = new mongoose.model("Product_store", product_store)
