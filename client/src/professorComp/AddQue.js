import React, { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AddQue() {

    const courseOptions = ['Select a course',
    'Programming Fundamentals',
    'Data Structures and Algorithms',
    'Database Management Systems (DBMS)',
    'Computer Networks',
    'Operating Systems',
    'Software Engineering',
    'Web Development',
    'Cybersecurity',
    'Logical Reasoning',
    'Data Interpretation',
    'Verbal Reasoning',
    'Arithmetic Aptitude',]; 

    const { testId } = useParams();


    const [formData, setFormData] = useState({
        courseID: '',
        question: '',
        weightage: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'weightage') {
          const newValue = Math.min(5, Math.max(0, value));
          setFormData((prevData) => ({ ...prevData, [name]: newValue }));
        } else {
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        try {
          await axios.post(`http://localhost:8000/test/${testId}/addQuestion`, formData);
          setFormData({
            courseID: '',
            question: '',
            weightage: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '',
          });
          // Optionally, you can redirect to the next question or a success page
        } catch (error) {
          console.log(error);
          // Handle error
        }

      };
    
      return (
      <>
        <div className="add-que-container">
          <h2 className='gradient-underline' >ADD QUESTION</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="add-que">
            <label htmlFor="courseID">Course</label>
            <select
            name="courseID"
            value={formData.courseID}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Select a course"
             
          >
            {courseOptions.map((option, index) => (
              <option key={index} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </div>
    
            <div  className="add-que">
              <label htmlFor="question">Question</label>
              <textarea
                type="text"
                name="question"
                rows={5}
                value={formData.question}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Write Question here..."
              />
            </div>

            <div  className="add-que">
              <label htmlFor="weightage">Weightage (Out of 5)</label>
              <input
                type="text"
                name="weightage"
                value={formData.weightage}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give weightage to a question'
              />
            </div>

            <div  className="add-que">
              <label htmlFor="option1">Option 1</label>
              <input
                type="text"
                name="option1"
                value={formData.option1}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give Option 1'
              />
            </div>

            <div  className="add-que">
              <label htmlFor="option2">Option 2</label>
              <input
                type="text"
                name="option2"
                value={formData.option2}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give Option 2'
              />
            </div>

            <div  className="add-que">
              <label htmlFor="option3">Option 3</label>
              <input
                type="text"
                name="option3"
                value={formData.option3}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give Option 3'
              />
            </div>

            <div  className="add-que">
              <label htmlFor="option4">Option 4</label>
              <input
                type="text"
                name="option4"
                value={formData.option4}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give Option 4'
              />
            </div>
    
            <div  className="add-que">
              <label htmlFor="answer">Answer</label>
              <input
                type="text"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                required
                className="form-control"
                placeholder='Give correct answer here...'
              />
            </div>
    
            <div className='add-que'>
              <button type="submit" className="submit" >
                ADD
              </button>
            </div>
          </form>
        </div>
      </>
  )
}
