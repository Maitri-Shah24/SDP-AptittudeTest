import React, { useState } from 'react'
// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';


import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';

export default function AddTest() {

  const [testName, setTestName] = useState(''); 
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");

  const onChange = (value) => {
    setStartTime(value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Additional validation can be added here
   console.log(testName +" "+duration+" "+startDate+" "+startTime)
  };

  return (
    <div>
      <h1>Create a New Test</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="testName">Test Name:</label>
        <input
          type="text"
          id="testName"
          name="testName"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          required
        />

        <label htmlFor="duration">Duration (minutes):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

<div>
          <label>Date:</label>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </LocalizationProvider> */}
        </div>

        <div>
          <label>Time:</label>
          <TimePicker onChange={onChange} value={startTime} />
        </div>


        <button type="submit">Create Test</button>
      </form>
    </div>
  )
}
