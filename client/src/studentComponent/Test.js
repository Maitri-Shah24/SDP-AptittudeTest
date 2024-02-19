
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Test() {
    const { id } = useParams();
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    console.log(selectedAnswers);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/test/${id}/questions`);
        const questionsWithSelectedOption = response.data.map(question => ({
            ...question,
            selectedOption: '',
          }));
        setQuestions(questionsWithSelectedOption);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    console.log(questionIndex);
    console.log(optionIndex);
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = questions[questionIndex][`option${optionIndex + 1}`];
    setSelectedAnswers(newSelectedAnswers);
    console.log(newSelectedAnswers);
  }

  return (
    <div>
         <div className='test-question-container'>
      {questions.map((question, questionIndex) => (
        <div key={question._id}>
          <h3>{questionIndex+1}. {question.question}</h3>
          {['option1', 'option2', 'option3', 'option4'].map((optionKey, optionIndex) => (
            <div className='options'>
              <label key={optionKey}>
                <input
                  type="radio"
                  name={`question${questionIndex}`}
                  value={question[optionKey]}
                  // checked={question.selectedOption === question[optionKey]}
                  onChange={() => handleOptionChange(questionIndex, optionIndex)}
                />
                {question[optionKey]}    
                </label>  
                </div>
                ))}   
            </div>
          ))} 
    </div>
    </div>
  )
}
