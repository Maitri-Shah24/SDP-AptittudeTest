import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { baseurl } from '../services/Url';

export default function Instruction() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [queNumber, setQueNumber] = useState(0);
  const [duration, setDuration] = useState(0);
  console.log(queNumber);
  console.log(duration);

  useEffect(() => {
    const fetchDetails = async () => {
        try {
          const response = await axios.get(`${baseurl}/test/${id}/questions`);
          setQueNumber(response.data.length);
          const response2 = await axios.get(`${baseurl}/test/${id}/duration`);
          setDuration(response2.data.duration)
        }catch(error){
        }
      }
      fetchDetails();
  }
  )
  function handleSubmit(){
    navigate(`/starttest/${id}`);
  }
  function handleBack(){
    navigate("/studentDashboard")
  }
  return (
    <div className='instruction-main-container'>
      <div className="instruction-container">
      <h1>Instructions</h1>
      <ul>
        <li>Number of Questions: {queNumber}</li>
        <li>Duration: {duration} minutes</li>
        <li>Do not switch tabs during the test</li>
        <li>Read each question carefully before answering.</li>
        <li>Review your answers before submitting the test.</li>
        <li>Submit the test before the timer expires.</li>
        <li>Do not use any external resources or assistance during the test.</li>
      </ul>
      <p>All the best!</p>
      <div className='d-flex'>
      <button className="start-test-button" onClick={handleSubmit}>Start Test</button>
      <button className="start-test-button" onClick={handleBack}>Back to Dashboard</button>
      </div>
    </div>
    </div>
  )
} 
