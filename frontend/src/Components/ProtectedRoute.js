import React from 'react'
import {  Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');
  
    return isAuthenticated ? children : <Navigate to="/" />;
  };
  
export const ProtectedRouteAdmin =({ children })=>{
    const isAuthenticated = !!localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin')==='true';

    return isAuthenticated && isAdmin ? children : <Navigate to="/admin-login" />;
  }
  
