import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'; // Assuming you have this CSS file in the right path
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  
  const [messages, setMessages] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const baseURL = 'http://127.0.0.1:8000/api/'
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation: Check if passwords match
    if (formData.password1 !== formData.password2) {
      setMessages(['Passwords do not match']);
    } else {
      axios.post(baseURL + 'signup', { 
        username: formData.username,
        email : formData.email,
        password : formData.password1
      }).then(
        response=>{console.log(response.data)}
      ).catch(
        error=>{console.log(error)}
      )
      
      setMessages(['Account created successfully!']);
      navigate('/')
    }
  };

  return (
    <section className="gradient-custom">
      <div className="container py-4 h-50">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                  <p className="text-white-50 mb-5">Create your account.</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        name="username"
                        className="form-control form-control-lg"
                        value={formData.username}
                        onChange={handleChange}
                      />
                      <label className="form-label">Username</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label className="form-label">Email</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        name="password1"
                        className="form-control form-control-lg"
                        value={formData.password1}
                        onChange={handleChange}
                      />
                      <label className="form-label">Password</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        name="password2"
                        className="form-control form-control-lg"
                        value={formData.password2}
                        onChange={handleChange}
                      />
                      <label className="form-label">Confirm Password</label>
                    </div>
                    <div>
                      <button className="btn btn-outline-light btn-lg px-5" type="submit">
                        Signup
                      </button>
                    </div>
                  </form>

                  {/* Displaying messages */}
                  {messages.length > 0 && (
                    <div>
                      {messages.map((message, index) => (
                        <p key={index} className="text-danger">
                          {message}
                        </p>
                      ))}
                    </div>
                  )}

                  <div>
                    <p className="mb-0 pt-3">
                      Have an account already?{' '}
                      <Link to="/" className="text-white-50 fw-bold">
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
