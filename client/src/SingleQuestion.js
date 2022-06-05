function SingleQuestion(props) {
    const {question,index,setArrayOfAnswers,arrayOfAnswers} = props

  return (
    <div className="SingleQuestion">
        <h1>{question.text} ({question.theme}) {question.complexity}</h1>
        {
            question.answers.map((answ)=>{
               return <label>
                <input 
                    type="radio" 
                    name={"answer"+index}
                    value={answ}
                    onChange={()=>{
                        const updatedAnswers = arrayOfAnswers.map((el,answerIndex)=>{
                        if(answerIndex === index){
                            return el = answ
                        }else{
                            
                            return el
                        }
                        })
                        setArrayOfAnswers(updatedAnswers)
                    }
                    }/>{answ}
                    </label>

            })
        }
        
    </div>
  );
}

export default SingleQuestion;
