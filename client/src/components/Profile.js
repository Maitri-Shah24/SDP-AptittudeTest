import React, { useState, useEffect } from "react";
import { useSession } from "./SessionContext";
import axios from "axios";
import StudentNavbar from "../studentComponent/StudentNavbar";
import ProfessorNavbar from "../professorComp/ProfessorNavbar";
import { baseurl } from "../services/Url";

export function StudentProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [editing, setEditing] = useState(false);
 const user = sessionStorage.getItem('user');
  const role = sessionStorage.getItem('userRole');
  console.log(role)

  useEffect(() => {
    const fetchUserInfo = async () => {

      if (!user) {
        return; // Return early if user is null or undefined
      }

      try {
        const response = await axios.get(
          `${baseurl}/profile/${user}?role=${role}`
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
  }, [user,role]);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${baseurl}/profile/${user}?role=${role}`,
        userInfo
      );
      if (response.status === 200) {
        console.log("Profile updated successfully");
        setEditing(false);
      } else {
        console.error(
          "Failed to update user information:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div>
      {role==='student'?<StudentNavbar />:<ProfessorNavbar/>}
      <div className="col-xl-6 order-xl-5 profile-container">
        <div className="card bg-secondary shadow">
          <div className="card-header bg-white border-0">
            <div className="row align-items-center">
              <div className="col-8">
                <h6
                  style={{ fontFamily: "sans-serif", fontWeight: "bold", color: "#525f7f" }}
                  className="mb-0"
                >
                  My Profile
                </h6>
              </div>
              <div className="col-4 text-right">
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="btn btn-sm btn-primary">
                    Edit Profile
                  </button>
                ) : (
                  <button onClick={handleSave} className="btn btn-sm btn-primary">
                    Save Profile
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="card-body">
            <form>
              <h6 style={{ fontSize: "13px" }} className="heading-small text-muted mb-4">
                User information
              </h6>
              <div className="pl-lg-4">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group focused">
                      <label className="form-control-label" htmlFor="input-username">
                        {role==='student'?"Student ID":"Professor ID"}
                      </label>
                      <input
                        type="text"
                        id="input-username"
                        className="form-control form-control-alternative bg-white"
                        value={role === 'student' ? (userInfo ? userInfo.studentId : "Loading...") : (userInfo ? userInfo.professorId : "Loading...")}
                        readOnly={!editing}
                        onChange={(e) => setUserInfo({ ...userInfo, studentId: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="form-control-label" htmlFor="input-email">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="input-email"
                        className="form-control form-control-alternative bg-white"
                        value={userInfo ? userInfo.email : "loading..."}
                        readOnly={!editing}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group focused">
                      <label className="form-control-label" htmlFor="input-first-name">
                        First name
                      </label>
                      <input
                        type="text"
                        id="input-first-name"
                        className="form-control form-control-alternative bg-white"
                        value={userInfo ? userInfo.firstName : "loading..."}
                        readOnly={!editing}
                        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group focused">
                      <label className="form-control-label" htmlFor="input-last-name">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="input-last-name"
                        className="form-control form-control-alternative bg-white"
                        value={userInfo ? userInfo.lastName : "loading..."}
                        readOnly={!editing}
                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentProfile;
