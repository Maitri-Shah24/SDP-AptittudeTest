import React, { useState } from 'react'
import axios from "axios";
import { Link, useHistory, useNavigate } from 'react-router-dom';

export default function AddTest() {

  const [formData, setFormData] = useState({
      testName:'',
      duration:'',
      date:'',
      startTime:'',
      endTime:''

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'duration' ? Math.max(0, value) : value,
    }));
  };

  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      
      const response= await axios
        .post("http://localhost:8000/test", {
          testName: formData.testName,
          duration: formData.duration,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
        })
        history(`/addQue/${response.data._id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="add-que-container">
      <h2 className='gradient-underline' >ADD APTITUDE TEST</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="add-que">
        <label htmlFor="testName">Test Name</label>
        <input
          type="text"
          id="testName"
          name="testName"
          value={formData.testName}
          onChange={handleChange}
           required
          className="form-control"
        />
        </div>

        <div className="add-que">
        <label htmlFor="duration">Duration (minutes)</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="form-control"
        />
        </div>

        <div className="add-que">
          <label>Date</label>
          <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="form-control"
        />
        </div>

        <div className="add-que">
          <label>Test Start Time</label>
          <input
          type='time'
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          className="form-control"
        />
        </div>

        <div className="add-que">
          <label>Test End Time</label>
          <input
          type="time"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          className="form-control"
        />
        </div>

         <div className='add-que'>
            
              <button type="submit" className="submit" >
                ADD QUESTIONS
              </button>
              
            </div>
      </form>
    </div>
  )
}
