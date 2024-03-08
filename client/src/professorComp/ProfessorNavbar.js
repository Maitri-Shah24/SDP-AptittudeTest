import React from 'react';

export default function ProfessorNavbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark nav-bg-color sticky-top">
        <div className="container-fluid">
          <div className="navbar-brand ms-4" >Navbar</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/professorhome">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/professordashboard">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About Us</a>
              </li>
            </ul>
            <ul className="navbar-nav me-4 mb-2 mb-lg-0 profile-menu">
              <li className="nav-item dropdown" >
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <div className="profile-pic">
                    <img src="https://source.unsplash.com/250x250?girl" alt="Profile Picture" />
                  </div>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="/profile"><i className="fas fa-sliders-h fa-fw"></i> My Profile</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#"><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
