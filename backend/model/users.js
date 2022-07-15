const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName : {type: String},
    email: {type:String,unique:true,required:true},
})

module.exports = mongoose.model('users',UserSchema)