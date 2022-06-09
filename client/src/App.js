import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import AddQuestion from "./AddQuestion";
import LogReg from "./LogReg";
import GetTest from "./StartTest";
import ShowQuestions from "./ShowQuestions";
import {
  getTotalScore,
  getTotalQuest,
  getTotalPoints,
  getTotalCorrectPoints,
} from "./getTotal";

export const UserContext = React.createContext();

function App() {
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [user, setUser] = useState();
  const [action, setAction] = useState("Menu");
  const [completeTests, setCompleteTests] = useState([]);

  useEffect(() => {
    GetListOfQuestions();
    if (localStorage.getItem("user")) {
      tougleUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  function tougleUser(user) {
    const login = user.login;
    const password = user.password;
    const type = user.type;
    const userId = user._id;
    setUser({ login: login, password: password, type: type, userId: userId });
    localStorage.setItem("user", JSON.stringify(user));
  }

  const GetListOfQuestions = () => {
    Axios.get("http://localhost:3001/getAllQuestions").then((response) => {
      setListOfQuestions(response.data);
    });
  };

  const GetCompleteTests = () => {
    Axios.get("http://localhost:3001/getTests", {
      params: { userId: user.userId },
    }).then((response) => {
      console.log(response);
      setCompleteTests(response.data);
      console.log(response.data);
      console.log(completeTests);
    });
  };

  return (
    <UserContext.Provider value={user}>
      <div className="App" data-testid="app">
        <div>
          {user ? (
            <div className="user-info">
              <h1>Login - {user.login}</h1>
              <h1>Position - {user.type}</h1>
            </div>
          ) : (
            <h1>You are not log ined</h1>
          )}
        </div>
        {action === "Menu" ? (
          <div className="menu-buttons">
            <button
              className="menu-button"
              onClick={() => setAction("LogIn")}
              data-testid="button"
            >
              {" "}
              Log In
            </button>
            <button
              className="menu-button"
              data-testid="button"
              onClick={() => {
                if (user.type === "teacher") {
                  setAction("Add");
                } else {
                  alert("Only Teachers can add questions");
                }
              }}
            >
              {" "}
              Add Question
            </button>
            <button
              className="menu-button"
              data-testid="button"
              onClick={() => {
                if (user.type === "teacher") {
                  GetListOfQuestions();
                  setAction("ListOfQuestions");
                } else {
                  alert("Only Teachers can watch questions");
                }
              }}
            >
              {" "}
              Get All Questions
            </button>
            <button
              className="menu-button"
              data-testid="button"
              onClick={() => setAction("GetTest")}
            >
              {" "}
              Get Test
            </button>
            <button
              className="menu-button"
              data-testid="button"
              onClick={() => {
                setAction("GetAllTests");
                GetCompleteTests();
                console.log(user);

                console.log(completeTests);
              }}
            >
              Get All My Tests
            </button>
          </div>
        ) : action === "LogIn" ? (
          <div>
            <LogReg setUser={tougleUser} />
            <button onClick={() => setAction("Menu")}>Back To Menu </button>
          </div>
        ) : action === "Add" ? (
          <div>
            <AddQuestion setAction={setAction} />
            <button onClick={() => setAction("Menu")}>Back To Menu </button>
          </div>
        ) : action === "ListOfQuestions" ? (
          <ShowQuestions setAction={setAction} />
        ) : action === "GetTest" ? (
          <GetTest setAction={setAction} />
        ) : action === "GetAllTests" ? (
          <div>
            <button onClick={() => setAction("Menu")}>Back To Menu </button>
            <h1>Всего вопросов пройдено {getTotalQuest(completeTests)}</h1>
            <h1>Всего отвечено правильно {getTotalScore(completeTests)}</h1>
            <h1>Всего Балов {getTotalPoints(completeTests)}</h1>
            <h1>Всего Балов набрано {getTotalCorrectPoints(completeTests)}</h1>
            <div className="AllTestResults">
              {completeTests.map((answer, index) => {
                return (
                  <div>
                    <div>
                      Test №{index}, theme ={answer.theme}
                    </div>
                    <ol>
                      <li>Number of questions {answer.countOfQuestions}</li>
                      <li>Correct answers {answer.countOfCorrectQuestions}</li>
                      <li>Number of Poins {answer.countOfPoints}</li>
                      <li>Correct Poins {answer.countOfCorrectPoints}</li>
                    </ol>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h1>Шото пошло не так</h1>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
