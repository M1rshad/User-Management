import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup';
import './App.css';
import AdminLogin from './Components/Admin Login/AdminLogin';
import AdminPanel from './Components/Admin Page/AdminPanel';
import Home from './Components/Home/Home';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/admin-login' element={<AdminLogin/>} />
        <Route path='/admin-panel' element={<AdminPanel/>} />
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
