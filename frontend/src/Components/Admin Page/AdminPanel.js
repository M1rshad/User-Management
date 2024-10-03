import React, { useState, useEffect } from 'react';
import './AdminPanel.css'; // Include your custom CSS here
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import image1 from './assets/check.png'
import image2 from './assets/close.png'

const AdminPanel = () => {
  const [searchInput, setSearchInput] = useState('');
  const [userObj, setUserObj] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('username')); // Placeholder for now
  const navigate = useNavigate();
  const baseURL = 'http://127.0.0.1:8000/api/'

  // Example of fetching user data from backend (replace with actual API)
  useEffect(() => {
    const source = axios.CancelToken.source(); // Create cancel token for cleanup

    axios.get(baseURL + 'admin-panel', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
      cancelToken: source.token, // Attach cancel token
    })
    .then((response) => {
      if (response.data && response.data.length > 0) {
        setUserObj(response.data); // Set the entire response array to state
        console.log('User Data:', response.data);
      } else {
        console.log('No data received');
      }
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.log('An error occurred:', error);  // Handle error
      }
    });

    return () => {
      source.cancel('Request canceled by the user.');  // Cleanup on unmount
    };
  }, []);

  // Handle form submission for search (example)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search logic here (e.g., filter or make an API call)
    console.log('Searching for:', searchInput);
  };

  // Handle logout (example)
  const handleLogout = () => {
    localStorage.clear()
    navigate('/admin-login');
  };

  return (
      <div className="gradient-custom">
      <header className="header h-50">
      <div className="row">
      <div className="col-5 col-md-9">
      <h4 className="d-flex justify-content-start text-white p-2 m-3">ADMIN PANEL</h4>
          </div>
          <div className="col-3 col-md-2">
          <h4 className="d-flex justify-content-end text-white p-2 mt-3 text-uppercase">
          {loggedInUser}
            </h4>
          </div>
          <div className="col-4 col-md-1">
            <button className="btn btn-sm btn-light mt-4 ml-auto" onClick={handleLogout}>
            Log out
            </button>
          </div>
          </div>
          </header>

      <section>
      <div className="row">
          <h2 className="p-3 text-center text-uppercase">User Management</h2>
        </div>

        {/* Create User Section */}
        <div className="container">
        <div className="row d-flex">
        <form onSubmit={handleSearchSubmit} className="form-inline col-10 mt-3">
              <div className="col-7">
                <input
                  type="text"
                  className="form-group form-control m-2"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="Search users"
                  />
                  </div>
                  <div className="form-group col-3 p-2">
                <button className="btn btn-dark" type="submit">
                  Search
                </button>
              </div>
            </form>
            <div className="col-2 col-md-2 mt-auto p-2 add-button">
              <Link to="/create-user">
                <button className="btn btn-dark">Add User</button>
              </Link>
              </div>
          </div>
          </div>

          {/* User Management Table */}
        <div className="row container mx-auto">
          <table className="table table-dark p-2">
          <thead>
          <tr>
                <th>ID</th>
                <th>USERNAME</th>
                <th>EMAIL ADDRESS</th>
                <th>STAFF</th>
                <th>EDIT</th>
                <th>CHANGE PASSWORD</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {userObj.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.is_superuser ? (
                      <img src={image1} height="25px" width="25px" alt="Staff" />
                    ) : (
                      <img src={image2} height="25px" width="25px" alt="Not Staff" />
                    )}
                  </td>
                  <td>
                    <Link to={`/edit-user/${user.id}`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/change-password/${user.id}`}>
                      <button className="btn btn-primary">Change Password</button>
                    </Link>
                  </td>
                  {!user.is_staff && (
                    <td>
                      <Link to={`/delete-user/${user.id}`}>
                        <button className="btn btn-danger">Delete</button>
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
              </tbody>
              </table>
              </div>
              </section>
              </div>
            
            );
          };
          
          export default AdminPanel;
          