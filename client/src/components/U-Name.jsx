import Axios from 'axios';
import { useState } from 'react';


export function UpdateName(){

    let [input, setInput] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");
            let res = await Axios.patch('http://localhost:3000/api/std/update', { name: input }, {
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },

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
                            <h6>Update Name</h6>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={(e)=>handleSubmit(e)}>
                               <input type='text' placeholder='Enter new name' required onChange={(e)=>setInput(e.target.value)} value ={input}/>
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