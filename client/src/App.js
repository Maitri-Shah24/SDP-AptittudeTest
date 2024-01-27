
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
import StudentNavbar from './studentComponent/StudentNavbar';
import AddTest from './professorComp/AddTest';
import ProfessorDashboard from './professorComp/ProfessorDashboard';



function App() {
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route exact path="/login" Component={Login} />
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
    </Routes>
    <ToastContainer/>
  </BrowserRouter>
   </> 

  );
}

export default App;
