import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../Images/skillassess.jpg'

export default function ProfessorNavbar() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user"); // Get the user identity from localStorage
    const storedProfileImage = localStorage.getItem(`profileImage_${user}`);
    console.log("Current user:", user);
    console.log("Stored profile image:", storedProfileImage);
    if (storedProfileImage) {
      const profileImg = document.querySelector(".profile-pic img");
      if (profileImg) {
        profileImg.src = storedProfileImage;
      }
    }
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem('user');
    navigate("/");

  }
  function handleProfileImage(event) {
    const user = localStorage.getItem("user"); // Get the user identity
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageUrl = event.target.result;
        const profileImg = document.querySelector(".profile-pic img");
        if (profileImg) {
          profileImg.src = imageUrl;
          localStorage.setItem(`profileImage_${user}`, imageUrl); // Store profile image with user identity
          console.log("Profile image set for user:", user);
        } else {
          console.error("Profile image element not found.");
        }
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark nav-bg-color sticky-top">
        <div className="container-fluid">
          <div className="navbar-brand ms-4" ><img src={logo} alt='logo' style={{ width: 'auto', height: '50px' }}  /></div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" aria-current="page" to="/professorhome">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/professordashboard">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/about">About Us</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav me-4 mb-2 mb-lg-0 profile-menu">
              <li className="nav-item dropdown" >
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <div className="profile-pic">
                    <img src="https://i.pinimg.com/564x/c2/65/20/c26520f649ac37dbda7d7bd40f3e040e.jpg" alt="Profile Picture" />
                  </div>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                    <div className="dropdown-item">
                      <label
                        htmlFor="profile-image-upload"
                        className="d-block cursor-pointer"
                      >
                        <i className="fas fa-user-plus fa-fw me-2"></i> Add
                        Profile Image
                      </label>
                      <input
                        id="profile-image-upload"
                        type="file"
                        //accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleProfileImage}
                      />
                    </div>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  <li><div className="dropdown-item" onClick={()=>navigate("/profile")}><i className="fas fa-sliders-h fa-fw"></i> My Profile</div></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><div className="dropdown-item"  onClick={handleLogout}><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</div></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
