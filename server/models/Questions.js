
const mongoose = require("mongoose");

const QuestionSchema =new mongoose.Schema({
    "text":{
        type:String,
        required:true,
    },
    "complexity":{
        type:Number,
        required:true,
    },
    "theme":{
        type:String,
        required:true,
    },
    "correctAnswer":{
        type:String,
        required:true,
    },
    "answers":{
        type:Array,
        required:false,
    }
})  

const QuestionModel = mongoose.model("Questions",QuestionSchema,"Questions");
module.exports = QuestionModel;