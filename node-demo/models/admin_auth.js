const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    email: {
        type: String, 
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})


module.exports = new mongoose.model("Admin", adminSchema)
