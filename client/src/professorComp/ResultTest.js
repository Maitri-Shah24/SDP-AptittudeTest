import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom'
import moment from 'moment-timezone';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function ResultTest(){
  
  const [pastTests,setPastTests] = useState([]);
  const timezone = 'Asia/Kolkata';
  const currentTime = moment().tz(timezone);
  const navigate = useNavigate();
  const currentDate = currentTime.format('YYYY-MM-DD');
  const currentTimeString = currentTime.format('HH:mm');

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tests');
        const tests = response.data;
  
        let pastTestsArray = [];
       
  
        tests.forEach(test => {
          const startTime = moment(test.startTime);
          const endTime = moment(test.endTime);
          const date = moment(test.date);
  
          if (currentDate > date.format('YYYY-MM-DD')) {
            pastTestsArray.push(test);
          } 
        });
  
        setPastTests(pastTestsArray);
  
      } catch (error) {
        console.error('Error fetching Test:', error);
      }
    };
  
    fetchTest();
  }, []); // Run only once on mount

  return (

    <div className='TestList-container'>
      <h2 className='test-heading'>Test List</h2>
  
    
      <div className="test-card-container">
        {pastTests.map(test => (
          <Link to={`/Studentresult/${test._id}`} className='test-card' style={{background:'rgba(89, 232, 206, 0.445)'}}>
          <div key={test._id}>
            <h3>{test.testName}</h3>
            <p>Duration: {test.duration} minutes</p>
            <p>Date: {test.date}</p>
            <p>Start Time: {test.startTime}</p>
            <p>End Time: {test.endTime}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
 