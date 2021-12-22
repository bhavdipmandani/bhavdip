const mongoose = require('mongoose')


const orderSchema = new  mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productData:[{
        productId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        quantity:{
            type: Number,
            required:true
        },
    }],
    totalPrice:{
        type:Number,
        required: true
    },
    addressId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },
})

module.exports = new mongoose.model("Order", orderSchema)


