import React from 'react';
import './css/styles.css'; // Importing the CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './js/scripts'; // Optional: Import any custom JavaScript if needed
import image1 from './assets/img/01.jpg';
import image2 from './assets/img/02.jpg';
import image3 from './assets/img/03.jpg';
import { useNavigate } from 'react-router-dom';



function Home() {
  const user = { username: localStorage.getItem('username') }; // Example user data
  const navigate = useNavigate()
  const logOut = () =>{
    localStorage.clear()
    navigate('/')
  }
  return (
    <div id="page-top">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#page-top">Homepage</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item pt-3 text-white">
                <h5>Hello, {user.username}!</h5>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={logOut}>Log out</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <header className="masthead text-center text-white">
        <div className="masthead-content">
          <div className="container">
            <h1 className="masthead-heading mb-0">One Page Wonder</h1>
            <h2 className="masthead-subheading mb-0">Will Rock Your Socks Off</h2>
            <a className="btn btn-primary btn-xl rounded-pill mt-5" href="#scroll">
              Learn More
            </a>
          </div>
        </div>
      </header>

      {/* Content Section 1 */}
      <section id="scroll">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <img
                  className="img-fluid rounded-circle"
                  src={image1} 
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <h2 className="display-4">For those about to rock...</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid,
                  mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 2 */}
      <section>
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="p-5">
                <img
                  className="img-fluid rounded-circle"
                  src={image2}
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-5">
                <h2 className="display-4">We salute you!</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid,
                  mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 3 */}
      <section>
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <img
                  className="img-fluid rounded-circle"
                  src={image3} 
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <h2 className="display-4">Let there be rock!</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid,
                  mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-dark">
        <div className="container px-5">
          <p className="m-0 text-center text-white small">Copyright &copy; Your Website 2023</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
