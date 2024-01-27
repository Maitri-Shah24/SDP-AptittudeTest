// In your frontend component (e.g., TestList.js)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestList = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/tests')
      .then(response => setTests(response.data))
      .catch(error => console.error('Error fetching tests:', error));
  }, []); 

  return (
    <div>
      <div>
      <h2>Test List</h2>
      <div className="test-card-container">
        {tests.map(test => (
          <div key={test._id} className="test-card">
            <h3>{test.testName}</h3>
            <p>Duration: {test.duration} minutes</p>
            <p>Date: {test.date}</p>
            <p>Start Time: {test.startTime}</p>
            <p>End Time: {test.endTime}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TestList;
