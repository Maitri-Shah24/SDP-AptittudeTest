
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'

export default function StudentTestList(){
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/tests')
      .then(response => setTests(response.data))
      .catch(error => console.error('Error fetching tests:', error));
  }, []); 

  return (
    <div>
      <div className='TestList-container'>
      <h2 className='gradient-underline'>Test List</h2>
      <div className="test-card-container">
        {tests.map(test => (
          <Link key={test._id} to={`/instruction/${test._id}`} className='test-card'>
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
    </div>
  );
};

