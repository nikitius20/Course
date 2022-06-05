import {useState,useEffect} from "react"
import Axios from "axios"


function ShowQuestions(props) {
    const [theme,setTheme] = useState("");
    const [themes,setThemes] = useState([]);
    const [listOfQuestions,setListOfQuestions]= useState([]);
    useEffect(()=>{
        Axios.get("http://localhost:3001/getThemes")
        .then((response)=>{
            setThemes(response.data)
        })
        Axios.get("http://localhost:3001/getQuestions",{params:{theme:theme}})
        .then((response)=>{
            console.log(response.data)
            setListOfQuestions(response.data)
            
        })

        console.log(theme)
      },[theme]);
  return (
    <div 
        className="StartTest"
        data-testid="StartTest">
            
        <select
                onChange={(event)=>{
                    setTheme((cur)=> event.target.value)
                }}
                >
                {themes.map((theme) => (
                    <option value={theme}>{theme}</option>
                ))}
        </select>
    {
        theme != "" ? 
                
                
                <div className="Questions">
                {listOfQuestions.map((question)=>{
                return <div>
                        <div>Text - {question.text}({question.theme}){question.complexity}
                        </div>
                        <ol>
                        <li>{question.answers[0]}</li>
                        <li>{question.answers[1]}</li>
                        <li>{question.answers[2]}</li>
                        <li>{question.answers[3]}</li>
                        </ol>
                    </div>
                })}
                </div>:
            <h1>
                Choose the theme
            </h1>
        
    }
    <button 
                    data-testid="button"
                    onClick={()=>props.setAction("Menu")}>back to menu</button>
    </div>
  );
}

export default ShowQuestions;
