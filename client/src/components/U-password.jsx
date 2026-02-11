import Axios from 'axios';
import { useState, useReducer } from 'react';

export function UpdatePassword(){

  const initialState = {
    password : '',
    newPassword : ''
  }

  let [state, dispatch] = useReducer((state, action)=>{

    switch(action.type){
        case "CHANGE_FIELD":
            return {...state, [action.payload.name] : action.payload.value}
        case "RESET":
            return initialState;
        default:
        return state
    }

  }, initialState)


  function handleChange(e){
    dispatch({
        type: "CHANGE_FIELD",
        payload: {
            name : e.target.name,
            value: e.target.value
        }
    })

  }

  async function handleSubmit(e){
    e.preventDefault();
    try{
      
        let token = localStorage.getItem('token')
        let res = await Axios.patch('http://localhost:3000/api/std/updatepassword', state , {
            headers:{
                Authorization : `Bearer ${token}`,
                "Content-Type" : "application/json"

            }
        })

        alert(res.data.message)



    }catch(error){

        alert(error)

    }

  }


  

    return(
        <>
        <div className='conatiner mt-3'>
            <div className='row'>
                <div className='col-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h6>Update Password</h6>
                        </div>
                        <div className='card-body'>
                            <form onSubmit = {(e)=>handleSubmit(e)}>
                               <input type='password' placeholder='Enter current password' className='w-100' onChange={(e)=>handleChange(e)} value={state.password} name='password'/>
                               <br/>
                               <br/>
                               <input type='password' placeholder='Enter new password' className='w-100' onChange={(e)=>handleChange(e)} value={state.newPassword} name='newPassword'/>
                               <br/>
                               <br/>
                               <input type='submit' />


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}