const express = require("express");
const app = express();
const mongoose = require("mongoose");
const QuestionModel = require("./models/Questions")
const UserModel = require("./models/Users")
const TestModel = require("./models/Tests")
const cors = require("cors")


app.use(express.json());
app.use(cors());


mongoose.connect(
    "mongodb+srv://StudTest:StudTest3000@cluster0.tiwo9.mongodb.net/StudTestingDB?retryWrites=true&w=majority"
);

app.get("/getAllQuestions",(req,res)=>{
    QuestionModel.find({},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
})

app.get("/getQuestions",(req,res)=>{
    console.log(req.body)
    QuestionModel.find({theme: req.query.theme},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    }).limit(req.query.countOfQuestions)
})

app.get("/getTests",(req,res)=>{
    console.log(req.body)
    TestModel.find({userId: req.query.userId},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
})

app.get("/getUser",(req,res)=>{
    UserModel.find({"login":req.query.login,"password":req.query.password},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            if(result){
                res.json(result);
            }else{
                res.send(false);
            }
        }
    })
})

app.get("/getThemes",(req,res)=>{
    QuestionModel.find({},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            const themesArray = [];
            //const array = result.json();
            result.forEach(el=>{
                if(!themesArray.includes(el.theme)){
                    themesArray.push(el.theme)
                }
            });
            console.log(themesArray)
            res.json(themesArray);
        }
    })
})

app.get("/getLastTest",(req,res)=>{
    TestModel.findOne({},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    }).sort({_id: -1})
})
app.post("/addUser",async(req,res)=>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
 
    res.json(user)
})

app.post("/addTest",async(req,res)=>{
    const test = req.body;
    const newTest = new TestModel(test);
    await newTest.save();

    res.json(test)
})

app.post("/addQuestion",async (req,res)=>{
    const question = req.body;
    const newQuestion = new QuestionModel(question);
    await newQuestion.save();
 
    res.json(question)
}) 
app.listen(3001,()=>{
    console.log("server started")
})


function add(x,y){
    return(x+y);
}

module.exports = add