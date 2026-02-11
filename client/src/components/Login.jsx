import { useReducer } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


export function Login(){
    const navigate = useNavigate();

    let initialState = {
        email: "",
        password: ""
    }

    const [state, dispatch] = useReducer((state, action)=>{
        switch(action.type){
            case "CHANGE_FIELD":
                return {...state, [action.payload.name]: action.payload.value}
            case "RESET":
                return initialState;
            default:
            return state
        }

    }, initialState)



    function handleChange(e){
        dispatch({
            type: 'CHANGE_FIELD',
            payload : {
                name : e.target.name,
                value: e.target.value
            }
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        console.log(state);

       try{

        let res = await Axios.post("http://localhost:3000/api/std/login", state);
       let {message, token} = res.data;
        localStorage.setItem('token', token )
        alert(message)
        navigate("/profile");

       }catch (error) {
        const msg =
          error.response?.data?.message ||
          error.message ||
          "Login failed";
      
        alert(msg);
      }
      
        dispatch({type: 'RESET'})


    }
    return (
        <>
        <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-4 m-auto">
          <div className="card">
            <div className="card-header">
              <h4>Login Form</h4>
            </div>
            <div className="card-body">
             <form onSubmit = {(e)=>handleSubmit(e)}>
             <label>Email </label>
                <input
                  className="w-100"
                  type="email"
                  required
                  placeholder="Enter your email"
                  onChange = {(e)=>handleChange(e)}
                  value = {state.email}
                  name="email"
                />
                <br></br>
                <br></br>
                <label>Password </label>
                <input
                  className="w-100"
                  type="password"
                  required
                  placeholder="Enter your password"
                  onChange = {(e)=>handleChange(e)}
                  value = {state.password}
                  name="password"
                />
                <br></br>
                <br></br>
                <input
                  className="w-100 btn btn-secondary"
                  type="submit"
                />
             </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      
        </>
    )

}