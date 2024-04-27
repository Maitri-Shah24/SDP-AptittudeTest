import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom'
import moment from 'moment-timezone';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { baseurl } from '../services/Url';

export default function TestList(){
  const [test,setTest] = useState([]);
  const [pastTests,setPastTests] = useState([]);
  const [currentTests, setCurrentTests] = useState([]);
  const [futureTests, setFutureTests] = useState([]);
  const timezone = 'Asia/Kolkata';
  const currentTime = moment().tz(timezone);
  const navigate = useNavigate();
  const currentDate = currentTime.format('YYYY-MM-DD');
  const currentTimeString = currentTime.format('HH:mm');

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`${baseurl}/tests`);
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

    <div className='TestList-container'>
      <h2 className='test-heading'>Test List</h2>
  
    <Tabs> 
      
        <TabList aria-label="lab API tabs example" className='tab-equal' selectedClassName='react-tabs__tab--selected'>
          <Tab  className="cursor-pointer py-4 px-8 flex flex-grow tab">
                  Past Test
          </Tab>
          <Tab  className="cursor-pointer py-4 px-8 flex flex-grow tab">
              Active Test</Tab>
          <Tab className="cursor-pointer py-4 px-8 flex flex-grow tab">
              Upcoming Test</Tab>
        </TabList>
      
      <TabPanel >
      <div className="test-card-container">
        {pastTests.map(test => (
          <Link to={`/questionanswer/${test._id}`} className='test-card' style={{background:'rgba(89, 232, 206, 0.445)'}}>
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
      </TabPanel>
      <TabPanel >
      <div className="test-card-container">
        {currentTests.map(test => (
          <div key={test._id}>
            <h3>{test.testName}</h3>
            <p>Duration: {test.duration} minutes</p>
            <p>Date: {test.date}</p>
            <p>Start Time: {test.startTime}</p>
            <p>End Time: {test.endTime}</p>
          </div>
        ))}
      </div>
      </TabPanel>
      <TabPanel >
      <div className="test-card-container">
        {futureTests.map(test => (
          <Link to={`/test/${test._id}`} key={test._id} className='test-card'>
            <h3>{test.testName}</h3>
            <p>Duration: {test.duration} minutes</p>
            <p>Date: {test.date}</p>
            <p>Start Time: {test.startTime}</p>
            <p>End Time: {test.endTime}</p>
          </Link>
        ))}
      </div>
      </TabPanel>
    </Tabs>
    
    </div>
  );
};
