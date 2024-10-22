import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup';
import './App.css';
import AdminLogin from './Components/Admin Login/AdminLogin';
import AdminPanel from './Components/Admin Page/AdminPanel';
import Home from './Components/Home/Home';
import {ProtectedRoute, ProtectedRouteAdmin} from './Components/ProtectedRoute';
import AddUser from './Components/Admin Page/AddUser/AddUser';
import EditUser from './Components/Admin Page/EditUser/EditUser';
import ChangePassword from './Components/Admin Page/ChangePassword/ChangePassword';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/admin-login' element={<AdminLogin/>} />
        <Route path='/admin-panel' element={<ProtectedRouteAdmin><AdminPanel/></ProtectedRouteAdmin>} />
        <Route path='/create-user' element={<AddUser/>} />
        <Route path='/edit-user/:userId' element={<EditUser/>} />
        <Route path='/change-password/:userId' element={<ChangePassword/>} />
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
