import React from "react";

export default function ProfessorNavbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark nav-bg-color sticky-top">
      <div className="container-fluid justify-content-center"  style={{ marginBottom: '30px',height:'50px' }}>
          <div className="row">
            <div className="col">
              <a className="navbar-brand" href="studenthome">
                Home
              </a>
            </div>
            <div className="col">
              <a className="navbar-brand" href="studentdashboard">
                Dashboard
              </a>
            </div>
            <div className="col">
              <a className="navbar-brand" href="about">
                About
              </a>
            </div>
            <div className="col">
              <a className="navbar-brand" href="contactus">
                Contact Us
              </a>
            </div>
          </div>
        </div>


          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="profile-pic">
                  <img
                    src="https://source.unsplash.com/250x250?girl"
                    alt="Profile Picture"
                  />
                </div>
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-sliders-h fa-fw"></i> Account
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-cog fa-fw"></i> Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="login">
                    <i className="fas fa-sign-out-alt fa-fw"></i> Log Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
  
      </nav>
    </>
  );
}
