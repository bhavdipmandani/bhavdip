const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const {JWT} = require('../config');

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: 'USER'
    }
})


userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, JWT.secret,{expiresIn: '24h'});
        // this.tokens = this.tokens.concat({ token: token });
        // await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

module.exports = new mongoose.model("User", userSchema)
