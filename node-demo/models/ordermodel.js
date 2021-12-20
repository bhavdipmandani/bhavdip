const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    orderData: {
        addressId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        }],

        productStoreId: [{
            // Product_store
            type: mongoose.Schema.Types.ObjectId, // type: 'ObjectId',
            ref: 'Product_store',

        }],

        totalAmount: {
            type: Number,
        },
    }
})


module.exports = new mongoose.model("Order", orderSchema)
