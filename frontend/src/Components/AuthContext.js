import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [isAdmin, setIsAdmin] = useState(false); // Admin state
  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === 'true'; // Check admin status from localStorage

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (adminStatus) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []); // Runs once on component mount

  // Move the log outside of useEffect to see updated values
  console.log('Auth status:', isAuthenticated, 'Admin status:', isAdmin);

  const logOut = () =>{
    localStorage.clear()
    setIsAuthenticated(false);
    navigate('/')
  }
  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/admin-login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, logOut, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
