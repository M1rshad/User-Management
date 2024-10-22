import React, {useState, useContext, useEffect}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext'


const baseURL = 'http://127.0.0.1:8000/api/'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate()

  const {isAuthenticated} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!username || !password) {
    setMessages(['Please fill in both fields.']);
    } else {
      axios.post(baseURL+'login',{
        username,
        password
      }
       ).then(response=>{
         localStorage.setItem("token", response.data.token)
         localStorage.setItem("username", response.data.username)
         localStorage.setItem("isAdmin", response.data.is_admin)


         navigate('/home')
         

       }).catch(error=>setMessages(['Invalid Credentials']))
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);


  return (
      <section className="gradient-custom">
      <div className="container py-4 h-50">
        <div className="adminLogin d-flex justify-content-end ">
          <Link to='admin-login'><button className='btn btn-dark'>Admin Login</button></Link>
        </div>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white mt-5" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
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
                    <div>
                      <button className="btn btn-outline-light btn-lg px-5" type="submit">
                        Login
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

                  <div>
                    <p className="mb-0 pt-3">
                      Don't have an account? <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
