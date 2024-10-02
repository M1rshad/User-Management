import React, { useState } from 'react';
import './AdminLogin.css';  // Add your custom CSS here
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const AdminLogin = () => {
  // State to handle form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Example of basic form validation
    if (!username || !password) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    // Add your form submission logic here (API call, etc.)
    console.log('Login submitted with:', { username, password });
    
    // Clear the form after submission
    setUsername('');
    setPassword('');
    setErrorMessage(''); // Clear error messages after a successful submit
  };

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
                    
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    
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
