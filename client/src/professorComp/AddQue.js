import React, { useState } from 'react'


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
    'Artificial Intelligence (AI)',
    'Machine Learning (ML)',
    'Network Security',
    'Cloud Computing',
    'Computer Architecture',
    'Mobile App Development',
    'Data Science',
    'Logical Reasoning',
    'Data Interpretation',
    'Verbal Reasoning',
    'Arithmetic Aptitude',]; 

    const [formData, setFormData] = useState({
        courseID: '',
        question: '',
        marks: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
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
              <label htmlFor="marks">Marks</label>
              <input
                type="text"
                name="marks"
                value={formData.marks}
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
            {/* Add other form fields similarly */}
    
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
