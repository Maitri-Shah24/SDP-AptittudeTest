import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSession } from '../components/SessionContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Result() {
    const [test,setTest] = useState([]);
    const { user } = useSession();
    const userId = typeof user === 'object' ? user.id : user;
    const navigate = useNavigate();
    console.log(test);
    console.log("result")

    useEffect(()=>{
        const fetchTest=async()=>{
            try{
                const response = await axios.get(`http://localhost:8000/result/${userId}`);
                setTest(response.data.tests);
            }
            catch(error){
                console.log("fetching test error",error)
            }
        }
        fetchTest();
    },[user])
  return (
    <div className='TestList-container'>
      <div className="test-card-container">
        {test.map(test => (
          <div onClick={()=>navigate("/result", { state: { testId: test._id } })} className='test-card' style={{background:'rgba(89, 232, 206, 0.445)'}}>
          <div key={test._id}>
            <h3>{test.testName}</h3>
            <p>Duration: {test.duration} minutes</p>
            <p>Date: {test.date}</p>
            <p>Start Time: {test.startTime}</p>
            <p>End Time: {test.endTime}</p>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}
