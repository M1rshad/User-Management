import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import axios from "axios";

const ChangePassword = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 
  const baseURL = 'http://127.0.0.1:8000/api/'
  const {userId} = useParams()


  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation logic
    if (password1 !== password2) {
      setMessage("Passwords do not match!");
    } else {
      // Handle password change logic here (e.g., API call)
      axios.patch(`${baseURL}users/${userId}/`,
        {
            password : password1
        }
        ,{
        headers:{
            "Authorization" : `Token ${localStorage.getItem('token')}`
        }
      }).then( res=>
        {console.log('Password changed successfully');
        navigate("/admin-panel");}
    ).catch(
        err => console.log(err.message)
      )
      
    }
  };

  return (
    <section className="gradient-custom">
      <div className="container py-4 h-50">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <div className="mt-md-4">
                  <h2 className="fw-bold mb-5 text-uppercase">Reset password</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                      />
                      <label className="form-label">New password</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                      />
                      <label className="form-label">Confirm password</label>
                    </div>

                    <div>
                      <button className="btn btn-outline-light btn-lg px-5" type="submit">
                        Reset password
                      </button>
                    </div>

                    {message && <p className="text-danger mt-3">{message}</p>}
                  </form>

                  <div>
                    <button
                      className="btn btn-outline-light btn-sm px-5 mt-5"
                      type="button"
                      onClick={() => navigate("/admin_panel")} // Redirect on button click
                    >
                      Go back
                    </button>
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

export default ChangePassword;
