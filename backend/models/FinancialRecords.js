const mongoose = require("mongoose");

const financSchema = new mongoose.Schema({
    amount : {
        type: Number
    },
    type : {
        type : String,
        enum : ['income','expense'] 
    },
    category :{
        type:String
    },
    date : {
        type: Date,
        default : Date.now,
    },
    notes : {
        type:String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isDeleted : {
        type:Boolean,
        default: false,
    }
},{timestamps:true});

module.exports = mongoose.model('Records',financSchema);