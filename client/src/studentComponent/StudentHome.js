import React from 'react'

import home1 from '../Images/home.webp'
import StudentNavbar from './StudentNavbar'
import { useSession } from '../components/SessionContext'

export default function StudentHome() {
  const {user} = useSession();
   // Add a null check for the user object
   const userId = user ? user.id : null;
  return (
    <>
    <StudentNavbar/>
   
    <div className="home-container">
      <div className="home-text">
        <h1>"Unlock Your Potential: Discover, Practice, Excel! "</h1>
        <p>Discover our specialized aptitude tests, meticulously crafted to boost your readiness for placement assessments. Whether you're a recent graduate or a professional advancing your career, our platform equips you with skills and confidence to ace tests. Dive into tailored learning, covering logical reasoning, verbal ability, and quantitative aptitude. Real-world simulations and detailed analytics help gauge preparedness and identify areas for growth. Elevate your career prospects — start your journey today!</p>
      </div>
      <div className='home-img'>
        <img src={home1} alt='image'/>
      </div>
    </div>
    {userId}
    </>
  )
}
