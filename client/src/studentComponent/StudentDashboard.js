import React, { useEffect, useState } from 'react'
import StudentTestList from './StudentTestList'
import StudentNavbar from './StudentNavbar'
import axios from 'axios';
import moment from 'moment-timezone';
import { resolveDateFormat } from '@mui/x-date-pickers/internals/utils/date-utils';

export default function StudentDashboard() {

  const [test,setTest] = useState([]);
  const [pastTests,setPastTests] = useState([]);
  const [currentTests, setCurrentTests] = useState([]);
  const [futureTests, setFutureTests] = useState([]);
  const timezone = 'Asia/Kolkata';
  const currentTime = moment().tz(timezone);

  const currentDate = currentTime.format('YYYY-MM-DD');
  const currentTimeString = currentTime.format('HH:mm');
  console.log(currentDate);
  console.log(currentTimeString);
  console.log(currentTests);
  console.log(futureTests);
  console.log(pastTests);
  console.log(test);


  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tests');
        const tests = response.data;
  
        let pastTestsArray = [];
        let currentTestsArray = [];
        let futureTestsArray = [];
  
        tests.forEach(test => {
          const startTime = moment(test.startTime);
          const endTime = moment(test.endTime);
          const date = moment(test.date);
  
          if (currentDate > date.format('YYYY-MM-DD')) {
            pastTestsArray.push(test);
          } else if (currentDate < date.format('YYYY-MM-DD')) {
            futureTestsArray.push(test);
          } else {
            if (currentTime.isAfter(endTime)) {
              pastTestsArray.push(test);
            } else if (currentTime.isBefore(startTime)) {
              futureTestsArray.push(test);
            } else {
              currentTestsArray.push(test);
            }
          }
        });
  
        setPastTests(pastTestsArray);
        setCurrentTests(currentTestsArray);
        setFutureTests(futureTestsArray);
  
      } catch (error) {
        console.error('Error fetching Test:', error);
      }
    };
  
    fetchTest();
  }, []); // Run only once on mount
  
  return (
    <>
      <StudentNavbar/>
          
        <p>pasttttt</p>
       {
          pastTests.map((test)=>(
          <div key={test._id}>  {test.testName}</div>
          ))
       }

       <p>current</p>
       {currentTests.map((test)=>(
         <div key={test._id}>  {test.testName}</div>
       ))}

        <p>future</p>
        {futureTests.map((test)=>(
         <div key={test._id}>  {test.testName}</div>
       ))}


       <StudentTestList/>
    </>
  )
}
