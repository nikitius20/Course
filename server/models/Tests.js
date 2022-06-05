const mongoose = require("mongoose");

const TestSchema =new mongoose.Schema({
    "userId":{
        type:String,
        required:true,
    },
    "theme":{
        type:String,
        required:true,
    },
    "countOfQuestions":{
        type:Number,
        required:true,
    },
    "countOfCorrectQuestions":{
        type:Number,
        required:true,
    },
    "countOfPoints":{
        type:Number,
        required:true,
    },
    "countOfCorrectPoints":{
        type:Number,
        required:true,
    },
    
})  

const TestModel = mongoose.model("Tests",TestSchema,"Tests");
module.exports = TestModel;