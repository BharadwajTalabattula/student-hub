import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import StudentHub from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Signup } from "./components/Signup";
import { Login } from './components/Login';
import { Profile } from './components/profile';
import { UpdateName } from './components/U-Name';
import { UpdatePassword } from './components/U-password';



function App() {


  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<StudentHub />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/profile" element={<Profile />}>
    <Route path="updatename" element={<UpdateName />} />
    <Route path="updatepassword" element={<UpdatePassword />} />
  </Route>
      </Routes>
   
      </BrowserRouter>
    </>
  );
}

export default App;
