import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VideoBackGround from '../components/VideoBackGround.js';
import axios from "axios";
import { toast} from "react-toastify";
import { useSession } from "../components/SessionContext";

export default function ProfessorLogin(props) {
    const [professorId, setProfessorId] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useSession();

    const history = useNavigate();

  async function logg(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/plogin", {
          professorId,
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
            setUser({ id: professorId });
            sessionStorage.setItem('user', professorId);
            history("/professorhome");
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
  
    const handleProfessorIdChange = (e) => {
      setProfessorId(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  // const {role}=props.location.state;
  return (
    <>
    <VideoBackGround/>
    <div className="register-container">
    <form className="form">
      <p className="title space">Login </p> 

        <label>
          <input className="input space" type="text" placeholder="" required=""  value={professorId}
              onChange={handleProfessorIdChange}/>
          <span>Professor Id</span>
        </label>
        <label>
          <input className="input space" type="password" placeholder="" required=""  value={password}
              onChange={handlePasswordChange}/>
          <span>Password</span>
        </label>
        <button className="submit" onClick={logg}>Login</button>
      <p className="signin">Not a member ? <Link to="/professorregister" className='link' >Sign in</Link> </p>
    </form>
    </div>
    </>
  )
}
