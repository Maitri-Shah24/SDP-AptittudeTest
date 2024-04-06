import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VideoBackGround from "../components/VideoBackGround";
import axios from "axios";
import { baseurl } from "../services/Url";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      await axios
        .post(`${baseurl}/register`, {
          firstName,
          lastName,
          studentId,
          email,
          password,
          confirmPassword,
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exists");
          } else if (res.data === "notexist") {
            history("/login");
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

  return (
    <>
      <VideoBackGround />
      <div className="register-container">
        <form className="form" action="POST">
          <p className="title">Register </p>
          <div className="flex">
            <label>
              <input
                className="input"
                type="text"
                placeholder=""
                required=""
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <span>Firstname</span>
            </label>

            <label>
              <input
                className="input"
                type="text"
                placeholder=""
                required=""
                value={lastName}
                onChange={handleLastNameChange}
              />
              <span>Lastname</span>
            </label>
          </div>

          <label>
            <input
              className="input"
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
              className="input"
              type="email"
              placeholder=""
              required=""
              value={email}
              onChange={handleEmailChange}
            />
            <span>Email</span>
          </label>

          <label>
            <input
              className="input"
              type="password"
              placeholder=""
              required=""
              value={password}
              onChange={handlePasswordChange}
            />
            <span>Password</span>
          </label>
          <label>
            <input
              className="input"
              type="password"
              placeholder=""
              required=""
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <span>Confirm password</span>
          </label>
          <Link to="/login">
            <button className="submit" onClick={handleSubmit}>
              Submit
            </button>
          </Link>
          <p className="signin">
            Already have an acount ?{" "}
            <Link to="/login" className="link">
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
}