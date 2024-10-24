// SignupForm.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'; 
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';

const SignupForm = ({ endpoint, title, buttonText, successMessage, redirectToLogin, redirectPath }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Check if passwords match
    if (formData.password1 !== formData.password2) {
      setMessages(['Passwords do not match']);
    } else {
      axios.post(endpoint, {
        username: formData.username,
        email: formData.email,
        password: formData.password1,
      })
        .then(response => {
          if (redirectToLogin) {
            navigate('/');  // Redirect to login
          } else if (redirectPath) {
            navigate(redirectPath);  // Redirect to admin-panel or any other path
          } else {
            setMessages([successMessage]);
          }
        })
        .catch(error => {
          if (error.response) {
            const data = error.response.data;
            if (data.errors) {
              setMessages(Object.values(data.errors).flat());
            } else if (data.message) {
              setMessages([data.message]);
            } else {
              setMessages(['Unexpected error. Please try again.']);
            }
          } else {
            setMessages(['Network error. Please try again.']);
          }
        });
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
                  <h2 className="fw-bold mb-2 text-uppercase">{title}</h2>
                  <p className="text-white-50 mb-5">
                    {title === 'Signup' ? 'Create your account.' : 'Create a new user account.'}
                  </p>
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
                        {buttonText}
                      </button>
                    </div>
                  </form>

                  {messages.length > 0 && (
                    <div>
                      {messages.map((message, index) => (
                        <p key={index} className="text-danger">
                          {message}
                        </p>
                      ))}
                    </div>
                  )}

                  {redirectToLogin && (
                    <div>
                      <p className="mb-0 pt-3">
                        Have an account already?{' '}
                        <Link to="/" className="text-white-50 fw-bold">
                          Log in
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
