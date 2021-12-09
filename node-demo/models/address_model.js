const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    street: {
          type: String,
          required: true,
      },
      city: {
          type: String,
          required: true,
      },
      state: {
          type: String,
          required: true,
      },
      zip: {
          type: String,
          required: true,
      },
      country: {
          type: String,
          required: true,
      },
})


module.exports = new mongoose.model("Address", addressSchema)