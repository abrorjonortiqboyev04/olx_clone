const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
            "Hato Email kiritildi!"
        ]
    },
    password: {
        type: String,
        required: true
    },
    telNumber: {
        type: String,
        required: true
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
}, {
    timestemps: true
})


module.exports = mongoose.model("User", userModel)