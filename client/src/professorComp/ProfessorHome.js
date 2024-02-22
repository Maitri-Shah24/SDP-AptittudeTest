import React from 'react'
import home1 from '../Images/prohome.jpg'
import ProfessorNavbar from './ProfessorNavbar'

export default function ProfessorHome() {
  return (
    <>
    <ProfessorNavbar/>
    <div className="home-container">
      <div className="home-text">
        <h1>"Empower Your Teaching Experience with Our Platform"</h1>
        <p>As a dedicated educator, our platform provides you with the tools to seamlessly manage and enhance your teaching journey. Create dynamic and customized assessments effortlessly, tailoring questions to suit your curriculum.Elevate your teaching experience and foster a collaborative learning environment. Join our community of educators dedicated to shaping the future. Start simplifying your test creation and result management processes with our Professor's Portal.</p>
      </div>
      <div className='home-img'>
        <img src={home1} alt='image'/>
      </div>
    </div>
    </>
  )
}
