import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import VideoBackGround from '../components/VideoBackGround' 
import axios from "axios";
import { baseurl } from '../services/Url';

export default function ProfessorRegister() {

    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [professorId, setProfessorId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleProfessorIdChange = (e) => {
    setProfessorId(e.target.value);
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
        .post(`${baseurl}/pregister`, {
          firstName,
          lastName,
          professorId,
          email,
          password,
          confirmPassword,
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exists");
          } else {
            history("/professorlogin");
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
   <VideoBackGround/>
    <div className="register-container">
    <form className="form">
    <p className="title">Register </p>
        <div className="flex">
        <label>
            <input className="input" type="text" placeholder="" required="" value={firstName}
                onChange={handleFirstNameChange}/>
            <span>Firstname</span>
        </label>

        <label>
            <input className="input" type="text" placeholder="" required="" value={lastName}
                onChange={handleLastNameChange}/>
            <span>Lastname</span>
        </label>
    </div>  

    <label>
        <input className="input" type="text" placeholder="" required="" value={professorId}
              onChange={handleProfessorIdChange}/>
        <span>Professor Id</span>
    </label>

    <label>
        <input className="input" type="email" placeholder="" required="" value={email}
              onChange={handleEmailChange}/>
        <span>Email</span>
    </label> 
        
    <label>
        <input className="input" type="password" placeholder="" required=""  value={password}
              onChange={handlePasswordChange}/>
        <span>Password</span>
    </label>
    <label>
        <input className="input" type="password" placeholder="" required="" value={confirmPassword}
              onChange={handleConfirmPasswordChange}/>
        <span>Confirm password</span>
    </label>
   
    <button className="submit" onClick={handleSubmit}>Submit</button>
    <p className="signin">Already have an acount ? <Link to="/professorlogin" className='link'>Login</Link> </p>
</form>
</div>
    </>
  )
}
