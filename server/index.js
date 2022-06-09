const express = require("express");
const app = express();
const mongoose = require("mongoose");
const QuestionModel = require("./models/Questions");
const UserModel = require("./models/Users");
const TestModel = require("./models/Tests");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://StudTest:StudTest3000@cluster1.q7sm4x9.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/getAllQuestions", (req, res) => {
  try {
    QuestionModel.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (er) {
    return res.status(500).json(err);
  }
});

app.get("/getQuestions", (req, res) => {
  try {
    QuestionModel.find({ theme: req.query.theme }, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.status(200).json(result);
      }
    }).limit(req.query.countOfQuestions);
  } catch (er) {
    return res.status(500).json(err);
  }
});

app.get("/getTests", (req, res) => {
  try {
    TestModel.find({ userId: req.query.userId }, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (er) {
    return res.status(500).json(err);
  }
});

app.get("/getUser", (req, res) => {
  try {
    UserModel.find(
      { login: req.query.login, password: req.query.password },
      (err, result) => {
        if (err) {
          res.json(err);
        } else {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(200).send(false);
          }
        }
      }
    );
  } catch (er) {
    return res.status(500).json(err);
  }
});

app.get("/getThemes", (req, res) => {
  try {
    QuestionModel.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        const themesArray = [];
        //const array = result.json();
        result.forEach((el) => {
          if (!themesArray.includes(el.theme)) {
            themesArray.push(el.theme);
          }
        });
        console.log(themesArray);
        res.status(200).json(themesArray);
      }
    });
  } catch (er) {
    return res.status(500).json(err);
  }
});

app.get("/getLastTest", (req, res) => {
  try {
    TestModel.findOne({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }).sort({ _id: -1 });
  } catch (er) {
    return res.status(500).json(err);
  }
});
app.post("/addUser", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.status(200).json(user);
  } catch (er) {
    return res.status(500).json(err);
  }
});

app.post("/addTest", async (req, res) => {
  try {
    const test = req.body;
    const newTest = new TestModel(test);
    await newTest.save();

    res.json(test);
  } catch (er) {
    res.json(er);
  }
});

app.post("/addQuestion", async (req, res) => {
  try {
    const question = req.body;
    const newQuestion = new QuestionModel(question);
    await newQuestion.save();

    res.status(200).json(question);
  } catch (er) {
    return res.status(500).json(err);
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log("server started");
});
