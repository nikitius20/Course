import { useState, useEffect } from "react";
import Axios from "axios";

function AddQuestion(props) {
  const [Question, setQuestion] = useState({
    text: "",
    theme: "",
    complexity: "",
    correctAnswer: "",
    answers: ["", "", "", ""],
  });
  const [error, setError] = useState("");

  const createQuestion = () => {
    if (
      Question.text &&
      Question.theme &&
      Question.correctAnswer &&
      Question.answers[0] &&
      Question.answers[1] &&
      Question.answers[2] &&
      Question.answers[3]
    ) {
      Axios.post("http://localhost:3001/addQuestion", Question).then(
        (response) => {
          alert("Question CREATED");
          props.setAction("Menu");
        }
      );
    } else {
      setError("Invalid Data");
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <div className="AddQuestionForm">
      <h3 className="error">{error}</h3>
      <div>
        <input
          type="text"
          placeholder="Text of a question"
          onChange={(event) => {
            const value = event.target.value;
            setQuestion((cur) => {
              return { ...cur, text: value };
            });
          }}
        />
        <input
          type="text"
          placeholder="Theme of a question"
          onChange={(event) => {
            const value = event.target.value;
            setQuestion((cur) => {
              return { ...cur, theme: value };
            });
          }}
        />
        <input
          type="number"
          placeholder="Complexity of a question"
          onChange={(event) => {
            const value = event.target.value;
            setQuestion((cur) => {
              return { ...cur, complexity: value };
            });
          }}
        />
        <input
          type="text"
          name="answers"
          placeholder="1 Answer (correct)"
          onChange={(event) => {
            const value = event.target.value;
            const updatedAnswers = Question.answers.map((el, index) => {
              if (index === 0) {
                return (el = value);
              } else {
                return el;
              }
            });
            setQuestion((cur) => {
              return { ...cur, answers: updatedAnswers, correctAnswer: value };
            });
          }}
        />
        <input
          type="text"
          name="answers"
          placeholder="2 Answer"
          onChange={(event) => {
            const value = event.target.value;
            const updatedAnswers = Question.answers.map((el, index) => {
              if (index === 1) {
                return (el = value);
              } else {
                return el;
              }
            });
            setQuestion((cur) => {
              return { ...cur, answers: updatedAnswers };
            });
          }}
        />
        <input
          type="text"
          name="answers"
          placeholder="3 Answer"
          onChange={(event) => {
            const value = event.target.value;
            const updatedAnswers = Question.answers.map((el, index) => {
              if (index === 2) {
                return (el = value);
              } else {
                return el;
              }
            });
            setQuestion((cur) => {
              return { ...cur, answers: updatedAnswers };
            });
          }}
        />
        <input
          type="text"
          name="answers"
          placeholder="4 Answer"
          onChange={(event) => {
            const value = event.target.value;
            const updatedAnswers = Question.answers.map((el, index) => {
              if (index === 3) {
                return (el = value);
              } else {
                return el;
              }
            });
            setQuestion((cur) => {
              return { ...cur, answers: updatedAnswers };
            });
          }}
        />
      </div>
      <button type="submit" onClick={createQuestion}>
        Add Question
      </button>
    </div>
  );
}

export default AddQuestion;
