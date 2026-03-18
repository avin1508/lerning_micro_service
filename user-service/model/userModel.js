const mongoose = require('mongoose');

const userSchems = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    preferences: {
       type: Object, // can be { key: value } or array, depending on your use-case
       default: {} 
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchems);