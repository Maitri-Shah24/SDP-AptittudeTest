import React from 'react';
import StudentNavbar from '../studentComponent/StudentNavbar';
import aboutus from '../Images/aboutus.jpg'
import ProfessorNavbar from '../professorComp/ProfessorNavbar';

function AboutPage() {
  const role = sessionStorage.getItem('userRole');
  return (
    <>
     {role==='student'?<StudentNavbar />:<ProfessorNavbar/>}
      <img src={aboutus} style={{width:'100%', height:'400px',opacity:'0.5'}}/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column',marginTop:"-130px" }}>
        <h1 style={{fontWeight:"bold"}}>Aptitude Test Software</h1>
        <p style={{marginLeft:"190px",fontStyle:"italic",fontWeight:"bold"}}>~Empowering minds, shaping futures</p>
        <p style={{color: "black"}}>
        Our software aids in preparing for a range of aptitude tests crucial in job recruitment. It equips you for numerical, verbal, and logical reasoning tests, ensuring success.
        </p>
        <p style={{color: "black"}}>
          Features of our Aptitude Test Software include:
          <ul>
            <li>Practice tests covering a wide range of topics and difficulty levels</li>
            <li>Interactive learning modules to improve your skills</li>
            <li>Performance tracking to monitor your progress</li>
            <li>Customizable study plans tailored to your needs</li>
            <li>Real-time feedback to help you identify areas for improvement</li>
          </ul>
        </p>
        <p style={{color: "black", background:'#ccc', padding:'10px', borderRadius:'20px'}}>
        Whether you're a job seeker or employer, our Aptitude Test Software supports you at every stage.
        </p>
      </div>
    </>
    
  );
}

export default AboutPage;
