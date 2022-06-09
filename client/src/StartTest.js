import { useState, useEffect } from "react";
import Axios from "axios";
import TestPage from "./TestPage";

function StartTest(props) {
  const [parameters, setParameters] = useState({
    theme: "",
    countOfQuestions: 0,
  });
  const [testStage, setTestStage] = useState("choose");
  const [themes, setThemes] = useState([]);
  const [answer, setAnswer] = useState({
    countOfQuestions: "",
    countOfCorrectQuestions: "",
  });

  const GetLast = () => {
    Axios.get("http://localhost:3001/getLastTest").then((response) => {
      setAnswer(response.data);
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/getThemes").then((response) => {
      console.log(response.data);
      setThemes(response.data);
    });
  }, []);

  useEffect(() => {
    setParameters((cur) => {
      return { ...cur, theme: themes[0] };
    });
    console.log(themes);
    console.log(parameters);
  }, [themes]);

  return (
    <div className="StartTest" data-testid="StartTest">
      <h3>Stage: {testStage}</h3>
      {testStage === "choose" ? (
        <div>
          <select
            onChange={(event) => {
              setParameters((cur) => {
                return { ...cur, theme: event.target.value };
              });
            }}
          >
            {themes.map((theme) => (
              <option value={theme}>{theme}</option>
            ))}
          </select>

          <input
            data-testid="input"
            type="number"
            placeholder="Amount of questions"
            onChange={(event) => {
              setParameters((cur) => {
                return { ...cur, countOfQuestions: event.target.value };
              });
            }}
          />
          <button data-testid="button" onClick={() => setTestStage("testing")}>
            Start Test
          </button>
          <button data-testid="button" onClick={() => props.setAction("Menu")}>
            back to menu
          </button>
        </div>
      ) : testStage === "testing" ? (
        <div data-testid="testing">
          <TestPage parameters={parameters} setTestStage={setTestStage} />
        </div>
      ) : testStage === "result" ? (
        <div data-testid="result">
          {GetLast()}
          <h1>
            Your result is {answer.countOfCorrectQuestions} out of{" "}
            {answer.countOfQuestions}
          </h1>
          <button data-testid="button" onClick={() => props.setAction("Menu")}>
            back to menu
          </button>
        </div>
      ) : (
        <h1>SMTH gone wrong</h1>
      )}
    </div>
  );
}

export default StartTest;
