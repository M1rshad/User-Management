import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup';
import './App.css';
import AdminLogin from './Components/Admin Login/AdminLogin';
import AdminPanel from './Components/Admin Page/AdminPanel';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/adminlogin' element={<AdminLogin/>} />
        <Route path='/adminpanel' element={<AdminPanel/>} />
      </Routes>
    </div>
  );
}

export default App;
