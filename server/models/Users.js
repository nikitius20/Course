const mongoose = require("mongoose");

const UserSchema =new mongoose.Schema({
    "login":{
        type:String,
        required:true,
    },
    "password":{
        type:String,
        required:true,
    },
    "type":{
        type:String,
        required:true,
    },
})  

const UserModel = mongoose.model("Users",UserSchema,"Users");
module.exports = UserModel;
