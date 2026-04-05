const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['viewer','admin','analyst'],
        default:'viewer'
    },
    isActive : {
        type : Boolean,
        default : true,
    },
},{timestamps:true});

module.exports = mongoose.model('User', userSchema)