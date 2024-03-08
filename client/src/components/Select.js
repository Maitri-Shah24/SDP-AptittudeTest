import React from 'react'
import { Link } from 'react-router-dom'
import FadingSymbols from './FadingSymbols'

export default function Select() {

    const handleRoleSelection = (role) => {
    sessionStorage.setItem('userRole', role);
    };
    return (   
    <>
      <FadingSymbols/>
      <div className="select-container" >
      <div className="inside-select">
      <Link to='/professorlogin' onClick={() => handleRoleSelection('professor')}>
        <button className="card-button">
            <div className="card-icon"  >&#x1F468;&#x200D;&#x1F3EB;</div>
            <h2>Professor</h2>
            <p>Provide a challenging and enriching learning experience for your students.</p>
        </button>
        </Link>
        <Link to='/login' onClick={() => handleRoleSelection('student')} >
        <button className="card-button">
            <div className="card-icon"  >&#x1F468;&#x200D;&#x1F393;</div>
            <h2>Student</h2>
            <p>Sharpen your problem-solving skills and track your progress on the path to academic success.</p>
        </button>
        </Link>
        </div>
        </div>
   </> 
  )
}
