import React, { useState, useEffect } from "react";
import { useSession } from "../components/SessionContext";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import NavigationMenu from "./NavigationMenu";


export  function StudentProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useSession();
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!user) {
          return; // Exit early if user doesn't exist
        }

        const response = await axios.get(
          `http://localhost:8000/profile/${userId}`
        );
        if (response.status === 200) {
          setUserInfo(response.data);
        } else {
          console.error(
            "Failed to fetch user information:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, [user]);

  return (
    <div>
      <StudentNavbar/>
      {/* <div className="container text-center"> */}
        {/* <div className="col"> */}
          <div class="col-xl-6 order-xl-5">
            <div class="card bg-secondary shadow">
              <div class="card-header bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h6 style={{fontFamily:"sans-serif",fontWeight:"bold",color:"#525f7f"}} class="mb-0">My Profile</h6>
                  </div>
                  <div class="col-4 text-right">
                    <a href="/profile" class="btn btn-sm btn-primary">
                      Edit Profile
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form>
                  <h6 style={{fontSize:"13px"}} class="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group focused">
                          <label
                            class="form-control-label"
                            for="input-username"
                      
                          >
                            Student ID
                          </label>
                          <input
                            type="text"
                            id="input-username"
                            class="form-control form-control-alternative"
                            placeholder="Username"
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group"> 
                          <label class="form-control-label" for="input-email" >
                            Email address
                          </label>
                          <input
                            type="email"
                            id="input-email"
                            class="form-control form-control-alternative"
                            placeholder="maitri@gmail.com"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group focused">
                          <label
                            class="form-control-label"
                            for="input-first-name"
                           
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            id="input-first-name"
                            class="form-control form-control-alternative"
                            placeholder="First name"
                            value="Maitri"
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group focused">
                          <label
                            class="form-control-label"
                            for="input-last-name"
                           
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            id="input-last-name"
                            class="form-control form-control-alternative"
                            placeholder="Last name"
                            value="Shah"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        {/* </div> */}
      {/* </div> */}
    </div>
  );
}
export default StudentProfile;
