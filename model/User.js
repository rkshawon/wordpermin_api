const mongoose = require("mongoose")
const Schema = mongoose.Schema

const uModel =  new Schema({
    name: {
        type: String,
        required: true,
        max: 20, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
        min: 6
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profile:{
        type: String,
        default: ''
    },
    score:{
        type: Array
    }
}, {timestamps: true})

const userModel = mongoose.model("User", uModel)
module.exports = userModel