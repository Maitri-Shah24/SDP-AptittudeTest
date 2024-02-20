import React from 'react';
import StudentNavbar from './StudentNavbar';

function AboutPage() {
  return (
    <>
      <StudentNavbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column',marginTop:"-70px" }}>
        <h4 style={{color: "rgba(38, 208, 177, 0.822)",fontSize:"30px",fontWeight:"bold"}}>About Aptitude Test Software</h4>
        <p style={{marginLeft:"190px",color: "rgba(38, 208, 177, 0.822)",fontStyle:"italic",fontWeight:"bold"}}>~Empowering minds, shaping futures</p>
        <p style={{color: "rgba(38, 208, 177, 0.822)"}}>
        Our software aids in preparing for a range of aptitude tests crucial in job recruitment. It equips you for numerical, verbal, and logical reasoning tests, ensuring success.
        </p>
        <p style={{color: "rgba(38, 208, 177, 0.822)"}}>
          Features of our Aptitude Test Software include:
          <ul>
            <li>Practice tests covering a wide range of topics and difficulty levels</li>
            <li>Interactive learning modules to improve your skills</li>
            <li>Performance tracking to monitor your progress</li>
            <li>Customizable study plans tailored to your needs</li>
            <li>Real-time feedback to help you identify areas for improvement</li>
          </ul>
        </p>
        <p style={{color: "rgba(38, 208, 177, 0.822)"}}>
        Whether you're a job seeker or employer, our Aptitude Test Software supports you at every stage.
        </p>
      </div>
    </>
  );
}

export default AboutPage;
