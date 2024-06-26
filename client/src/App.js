import './App.css';
import Select from './components/Select';
import Register from './studentComponent/Register';
import Login from './studentComponent/Login';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddQue from './professorComp/AddQue';
import ProfessorLogin from './professorComp/ProfessorLogin';
import ProfessorRegister from './professorComp/ProfessorRegister';
import SampleQues from './studentComponent/SampleQues';
import QuestionPage from './studentComponent/QuestionPage';
import StudentHome from './studentComponent/StudentHome';
import ProfessorHome from './professorComp/ProfessorHome';
import { ToastContainer } from 'react-toastify';
import AddTest from './professorComp/AddTest';
import ProfessorDashboard from './professorComp/ProfessorDashboard';
import TestDetails from './professorComp/TestDetails';
import StudentDashboard from './studentComponent/StudentDashboard';
import Instruction from './studentComponent/Instruction';
import Test from './studentComponent/Test';
import AboutPage from './components/AboutPage';
import { SessionProvider } from './components/SessionContext';
import StudentResult from './studentComponent/StudentResult';
import StudentProfile from './components/Profile';
import QuestionAnswer from './components/QuestionAnswer';
import OverallResult from './professorComp/OverallResult';


function App() {

  const storedUser = sessionStorage.getItem('user');
  let initialUser = null;
  
   try{
     initialUser = storedUser ? JSON.parse(storedUser) : null;
     console.log(initialUser);
  }
  catch(error)
  {
    console.log("Error in parsing JSON",error)
  }
 
  return (
   <>
  <BrowserRouter>
   <SessionProvider initialUser={initialUser}>
    <Routes>
      <Route exact path="/login" Component={Login} />
      <Route exact path="/profile" Component={StudentProfile} />
      <Route exact path="/register" Component={Register} />
      <Route exact path="/" Component={Select}/>
      <Route exact path="/addQue/:testId" Component={AddQue}/>
      <Route exact path="/professorlogin" Component={ProfessorLogin}/>
      <Route exact path="/professorregister" Component={ProfessorRegister}/>
      <Route exact path='/sampleque' Component={SampleQues}/>
      <Route exact path="/ques/:subject" Component={QuestionPage}/>
      <Route exact path="/studenthome" Component={StudentHome}/>
      <Route exact path="/professorhome" Component={ProfessorHome}/>
      <Route exact path="/addtest" Component={AddTest}/>
      <Route exact path="/professordashboard" Component={ProfessorDashboard}/>
      <Route exact path="/test/:id" Component={TestDetails} />
      <Route exact path="/studentdashboard" Component={StudentDashboard}/>
      <Route exact path="/about" Component={AboutPage}/>
      <Route exact path="/instruction/:id" Component={Instruction}/>
      <Route exact path="/starttest/:id" Component={Test}/>
      <Route exact path='/result' Component={StudentResult}/>
      <Route exact path='/questionanswer/:id' Component={QuestionAnswer}/>
      <Route exact path='/Studentresult/:id' Component={OverallResult}/>
    </Routes> 
    <ToastContainer/>
    </SessionProvider>
  </BrowserRouter>
   </> 

  );
}

export default App;
