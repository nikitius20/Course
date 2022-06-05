import {useState,useEffect} from "react"
import Axios from "axios"


function LogReg(props) {
    const [userLog,setUserLog]= useState({
      login:"",
      password:""
    });
    console.log(userLog)
    const [action,setAction] = useState("choose");
    const [error, setError] = useState("");

  const logIn = ()=>{
    Axios.get("http://localhost:3001/getUser",{params:userLog})
    .then((response)=>{
        if(response.data.length>0){
            props.setUser(response.data[0])
            console.log(response)
        }else{  
            setError("Unknown User")
            setTimeout(()=>setError(""),4000)
        }
    })
  }
  const Register = ()=>{
    Axios.get("http://localhost:3001/getUser",{params:userLog})
    .then((response)=>{
        if(response.data.length>0){
            setError("User Already exist")
            setTimeout(()=>setError(""),4000)
        }else if((userLog.type === "teacher"||userLog.type === "student") && userLog.login && userLog.password){
            Axios.post("http://localhost:3001/addUser",userLog)
            .then((response)=>{
                props.setUser(response.data)
                console.log(response.data)
            })
        }else{
            setError("Invalid Data")
            setTimeout(()=>setError(""),4000)
        }
    })
  }

  return (
    <div 
    className="LogReg"
    data-testid="LogReg"
    >
        <h3 className="error">{error}</h3>
    {
        
        action === "choose"? 
            <div>
                <button 
                    data-testid="button"
                    onClick={()=>setAction("LogIn")}> Log In</button>
                <button 
                    data-testid="button"
                    onClick={()=>setAction("Register")}> Register</button>
            </div>:
        action === "LogIn"? 
            <div 
                data-testid="login" >
                <input 
                    type="text"  
                    placeholder="Login"
                    onChange={(event)=>{
                        setUserLog((cur)=>{return{...cur,login:event.target.value}})
                    }}
                />
                <input 
                    type="password" 
                    name="answers" 
                    placeholder="Password"
                    onChange={(event)=>{
                        setUserLog((cur)=>{return{...cur,password:event.target.value}})
                    }}
                />
                
                <button onClick={logIn}>Log In</button>
                <button onClick={()=>setAction("Register")} >Register</button>
            </div> :
        action === "Register"  ? 
        <div
            data-testid="register" >
            {console.log(userLog)}
            <input 
                type="text"  
                placeholder="Login"
                onChange={(event)=>{
                    setUserLog((cur)=>{return{...cur,login:event.target.value}})
                }}
            />
            <input 
                type="password" 
                name="answers" 
                placeholder="Password"
                onChange={(event)=>{
                    setUserLog((cur)=>{return{...cur,password:event.target.value}})
                }}
            />
            <div>
                <input type="radio" name="type" value="teacher" onChange={(event)=>{
                    setUserLog((cur)=>{return{...cur,type:event.target.value}})
                }} />
                Teacher
            </div>
            <div>
                <input type="radio" name="type" value="student" onChange={(event)=>{
                    setUserLog((cur)=>{return{...cur,type:event.target.value}})
                }}
                />
                Student
            </div>
            
            <button onClick={()=>setAction("LogIn")} >Log In</button>
            <button onClick={Register}>Register</button>
        </div>:
        action === "qwe"? <button></button>:
        <h1>Шото пошло не так</h1>
    }
        
        


    </div>
  );
}

export default LogReg;
