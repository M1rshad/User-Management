import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [messages, setMessages] = useState([]);
  const { userId } = useParams(); // Assumes you're passing 'userId' as a URL param
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/`, {
            headers: {
              'Authorization': `Token ${localStorage.getItem('token')}`,
            }
          });
        const { username, email } = response.data;

        // Use functional update to avoid useEffect dependency warning
        setFormData((prevFormData) => ({
          ...prevFormData,
          username,
          email
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessages(['Failed to fetch user data.']);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/${userId}/`, formData, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        }
      });
      navigate('/admin-panel'); // Redirect to the admin panel after successful submission
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response && error.response.data) {
        setMessages(['Failed to update user.']);
      } else {
        setMessages(['Network error. Please try again.']);
      }
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
                  <h2 className="fw-bold mb-2 text-uppercase">Edit User</h2>
                  <p className="text-white-50 mb-5">Modify the user details.</p>
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
                    <div>
                      <button className="btn btn-outline-light btn-lg px-5" type="submit">
                        Update
                      </button>
                    </div>
                  </form>

                  {/* Display messages */}
                  {messages.length > 0 && (
                    <div>
                      {messages.map((message, index) => (
                        <p key={index} className="text-danger">
                          {message}
                        </p>
                      ))}
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

export default EditUser;
