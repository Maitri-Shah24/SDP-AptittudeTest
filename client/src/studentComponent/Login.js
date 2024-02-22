import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VideoBackGround from "../components/VideoBackGround";
import { toast} from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "../components/SessionContext";


export default function Login(props) {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useSession();

  const history = useNavigate();

  async function logg(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8000/login", {
          studentId,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
          
            toast.success("Login successful", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              style:{background:'white'}
            });
            setUser({ id: studentId });
            history("/studenthome");
          } else if (res.data === "notexist") {
            alert("User have not sign up");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // const {role}=props.location.state;
  return (
    <>
      <VideoBackGround />
      
      <div className="register-container">
        <form className="form">
          <p className="title space">Login </p>

          <label>
            <input
              className="input space"
              type="text"
              placeholder=""
              required=""
              value={studentId}
              onChange={handleStudentIdChange}
            />
            <span>Student Id</span>
          </label>
          <label>
            <input
              className="input space"
              type="password"
              placeholder=""
              required=""
              value={password}
              onChange={handlePasswordChange}
            />
            <span>Password</span>
          </label>
          <button onClick={logg} className="submit">
            Login
          </button>
          <p className="signin">
            Not a member ?{" "}
            <Link to="/register" className="link">
              Sign in
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
}