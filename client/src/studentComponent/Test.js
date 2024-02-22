
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSession } from '../components/SessionContext';

export default function Test() {
    const { id } = useParams();
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const marks = [];
    const incorrect = [];
    var totalMarks = 0;
    const { user } = useSession();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/test/${id}/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = questions[questionIndex][`option${optionIndex + 1}`];
    setSelectedAnswers(newSelectedAnswers);
  }

  console.log(selectedAnswers);
  const handleSubmit= async()=>{

        const response = await axios.get(`http://localhost:8000/test/${id}/getSubjects`)

        response.data.map((sub)=>{
            marks.push({
              subject: sub.subject,
              score: 0
            })

            incorrect.push({
              subject: sub.subject,
              incorrectNumber: 0
            })
        })
  
        questions.map((data,dataIndex)=>{
          console.log(data)
          console.log(dataIndex)
          if(selectedAnswers[dataIndex] === data["answer"])
          {
              const subjectIndex = marks.findIndex(subject => subject.subject === data.courseID);
              marks[subjectIndex]["score"]+=data.weightage;
              totalMarks += parseInt(data.weightage);
          }
          else
          {
            const subjectIndex = marks.findIndex(subject => subject.subject === data.courseID);
            incorrect[subjectIndex]["incorrectNumber"]+=1;
          }
        }
        )

        const userid = user.id;

        await axios.post(`http://localhost:8000/test/${id}/studentMarks/${userid}`,{subjectMarks: marks, totalMarks : totalMarks, incorrect : incorrect});
        
  }

  return (
    
    <div>
      {user.id}
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
                  onChange={() => handleOptionChange(questionIndex, optionIndex)}
                />
                {question[optionKey]}    
                </label>  
                </div>
                ))}   
            </div>
          ))} 
          
         <div className='add-que'>
            <button type="submit" className="submit" onClick={handleSubmit} >
              ADD QUESTIONS
            </button>
          </div>
    </div>
    </div>
  )
}
