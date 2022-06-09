import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { UserContext } from "./App";
import SingleQuestion from "./SingleQuestion";
import { shuffle } from "./ListShuffle";

function TestPage(props) {
  const user = useContext(UserContext);
  const [arrayOfQuestions, setArrayOfQuestions] = useState([]);
  const [arrayOfAnswers, setArrayOfAnswers] = useState();

  useEffect(() => {
    Axios.get("http://localhost:3001/getQuestions", {
      params: props.parameters,
    }).then((response) => {
      console.log(response.data);
      console.log(shuffle(response.data));
      setArrayOfQuestions(response.data);
      setArrayOfAnswers(
        response.data.map((el, index) => {
          return {
            numberOfQuestion: index,
            answer: "",
          };
        })
      );
    });
  }, []);

  const SendAnswer = () => {
    if (arrayOfQuestions.length > 0) {
      let countOfCorrectQuestions = 0;
      let countOfPoints = 0;
      let countOfCorrectPoints = 0;
      arrayOfQuestions.forEach((element, index) => {
        countOfPoints += element.complexity;
        if (element.correctAnswer === arrayOfAnswers[index]) {
          countOfCorrectQuestions++;
          countOfCorrectPoints += element.complexity;
        }
      });
      console.log(user);
      Axios.post("http://localhost:3001/addTest", {
        ...props.parameters,
        userId: user.userId,
        countOfCorrectQuestions: countOfCorrectQuestions,
        countOfPoints: countOfPoints,
        countOfCorrectPoints: countOfCorrectPoints,
      }).then((response) => {
        //props.setUser(response.data)
      });

      props.setTestStage("result");
    } else alert("Missing Questions");
  };
  return (
    <div className="GetTest">
      {
        <div>
          <div className="Questions">
            {console.log(arrayOfQuestions)}
            {console.log(props.parameters)}
            {arrayOfQuestions.map((question, index) => {
              return (
                <SingleQuestion
                  question={question}
                  index={index}
                  setArrayOfAnswers={setArrayOfAnswers}
                  arrayOfAnswers={arrayOfAnswers}
                />
              );
            })}
          </div>
          <button onClick={SendAnswer}>End Test</button>
          <button onClick={() => props.setTestStage("choose")}>Back </button>
        </div>
      }
    </div>
  );
}

export default TestPage;
