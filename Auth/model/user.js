const mongoose = require('mongoose');

//Define the schema
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }   
      
});

//Export this module to app.js
module.exports = mongoose.model('User', userSchema);