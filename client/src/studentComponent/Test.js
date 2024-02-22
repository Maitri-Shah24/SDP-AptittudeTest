
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
    const [time, setTime] = useState(() => {
      const storedTime = localStorage.getItem('testTime');
      return storedTime ? parseInt(storedTime, 10) : 0;
  });

  useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/test/${id}/questions`);
            setQuestions(response.data);
            const response2 = await axios.get(`http://localhost:8000/test/${id}/duration`);
            const timeMillisecond = parseInt(response2.data.duration * 60 * 1000);
            setTime(prevTime => {
                const storedTime = localStorage.getItem('testTime');
                const storedTimeInt = storedTime ? parseInt(storedTime, 10) : 0;
                return storedTimeInt > 0 ? storedTimeInt : timeMillisecond;
            });
            if (!localStorage.getItem('testTime')) {
                localStorage.setItem('testTime', timeMillisecond.toString());
            }
        } catch (error) {
            console.error('Error fetching Time:', error);
        }
    };

    fetchQuestions();
}, [id]);



  
  useEffect(() => {
    let intervalId;

    const tick = () => {
        setTime(prevTime => {
            const newTime = prevTime - 1000;
            localStorage.setItem('testTime', newTime.toString());
            return newTime >= 0 ? newTime : 0;
        });
    };

    intervalId = setInterval(tick, 1000);

    return () => {
        clearInterval(intervalId);
    };
}, []);


  const getFormattedTime=(milliseconds)=>{

    if (isNaN(milliseconds)) {
      return ""; 
  }
    let total_seconds = parseInt(Math.floor(milliseconds/1000));
    let total_minutes = parseInt(Math.floor(total_seconds/60));
    let total_hours = parseInt(Math.floor(total_minutes/60));

    let seconds = parseInt(total_seconds % 60);
    let minutes = parseInt(total_minutes % 60);
    let hours = parseInt(total_hours % 24);

    return `${hours}: ${minutes}: ${seconds}`;
  }

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = questions[questionIndex][`option${optionIndex + 1}`];
    setSelectedAnswers(newSelectedAnswers);
  }
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
        <div className='test-timer'>{getFormattedTime(time)}</div>
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
