import React, { useState, useContext, useEffect } from 'react';
import './AdminLogin.css';  // Add your custom CSS here
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const AdminLogin = () => {
  // State to handle form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Messages, setMessages] = useState('');

  const baseURL = 'http://127.0.0.1:8000/api/'
  const navigate = useNavigate()
  const {isAuthenticated, isAdmin} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
    setMessages(['Please fill in both fields.']);
    } else {
      axios.post(baseURL+'admin-login',{
        username,
        password
      }
       ).then(response=>{
         localStorage.setItem("token", response.data.token)
         localStorage.setItem("username", response.data.username)
         localStorage.setItem("isAdmin", response.data.is_admin)         
         navigate('/admin-panel')
       }).catch(error=>setMessages(['Invalid Credentials']))
    }
  };

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin-panel');
    }
  }, [isAuthenticated,isAdmin, navigate]);

  return (
    <section className="gradient-custom">
      <div className="container py-4 h-50">
      <div className="userLogin d-flex justify-content-end ">
          <Link to='/'><button className='btn btn-dark'>User Login</button></Link>
        </div>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white mt-5" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">Admin login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        name="username"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="form-label">Username</label>
                    </div>
                    
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label">Password</label>
                    </div>
                    
                    {Messages && <p className="text-danger">{Messages}</p>}
                    
                    <div>
                      <button className="btn btn-outline-light btn-lg px-5" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
