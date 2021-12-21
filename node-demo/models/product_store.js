const mongoose = require("mongoose")
// const schema = mongoose.Schema;

const product_store = new mongoose.Schema({

    productStoreData: {
        productId: [{
            // type: 'ObjectId',
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }],
        UserId: [{
            // type: 'ObjectId',
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    }

})

module.exports = new mongoose.model("Product_store", product_store)
