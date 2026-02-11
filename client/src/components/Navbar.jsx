import { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export function Navbar({handleDisplay, profile}){



   function signup(){
    handleDisplay('signup');

   }

   function login(){
    handleDisplay('login');
   }



    return(
        <>
        <nav className='navbar bg-success'>
           <div className='container-fluid'>
           <div className='navbar-brand text-light bold'>
           <Link to ="/" className="nav-link active text-white" > S-HUB </Link>
            </div>
            <div className='d-flex gap-2'>
            <Link to ="/signup" className="nav-link active text-white" > 
            <button className='btn btn-light'>signup</button>
             </Link>
            <Link to ="/login" className="nav-link active text-white" >
            <button className='btn btn-light'>login</button>
            </Link>
            </div>
         
           
       
         
           </div>

        </nav>
        </>
    )
}