import React, { useState, useEffect } from 'react';
import './AdminPanel.css'; // Include your custom CSS here
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPanel = () => {
  const [searchInput, setSearchInput] = useState('');
  const [userObj, setUserObj] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('Admin'); // Placeholder for now
  const navigate = useNavigate();

  // Example of fetching user data from backend (replace with actual API)
  useEffect(() => {
    const fetchUsers = async () => {
      // Make an API call to get users
      const response = await fetch('/api/get_users'); // Example API endpoint
      const data = await response.json();
      setUserObj(data.users); // Assuming 'users' is returned
    };

    fetchUsers();
  }, []);

  // Handle form submission for search (example)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search logic here (e.g., filter or make an API call)
    console.log('Searching for:', searchInput);
  };

  // Handle logout (example)
  const handleLogout = () => {
    // Implement logout logic here, e.g., clear auth token
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="gradient-custom">
      <header className="header h-50">
        <div className="row">
          <div className="col-5 col-md-9">
            <h4 className="text-white p-2 m-3">ADMIN PANEL</h4>
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
                    {user.is_staff ? (
                      <img src="/path/to/check.png" height="25px" width="25px" alt="Staff" />
                    ) : (
                      <img src="/path/to/close.png" height="25px" width="25px" alt="Not Staff" />
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
