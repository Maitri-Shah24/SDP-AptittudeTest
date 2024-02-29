
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../components/SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Test() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const marks = [];
    var correctMarks = 0;
    var notSelectedMarks = 0;
    var incorrectMarks = 0;
    const { user } = useSession();
    const [time, setTime] = useState(() => {
      const storedTime = localStorage.getItem(`testTime_${id}`);
      return storedTime ? parseInt(storedTime, 10) : 0;
  });
  const userId = user ? user.id : null;
  const [testName,setTestName]=useState("");

  const [tabSwitchCount, setTabSwitchCount] = useState(0);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                setTabSwitchCount(prevCount => prevCount + 1);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if(tabSwitchCount <= 2 && tabSwitchCount>0){
            alert('Do not switch the tab, Test will be automactically submit after 3 switches.')
        }
        if (tabSwitchCount > 2) {
            alert('You have switched tabs multiple times. Your test will be submitted.');
            navigate("/result");
        }

    }, [tabSwitchCount]);

  useEffect(() => {
    if (!id) {
      return; // If id is not available, don't proceed with fetching questions
  }
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/test/${id}/questions`);
            setQuestions(response.data);
            const response2 = await axios.get(`http://localhost:8000/test/${id}/duration`);
            const timeMillisecond = parseInt(response2.data.duration * 60 * 1000);
            setTestName(response2.data.testName);
            setTime(prevTime => {
              const storedTime = localStorage.getItem(`testTime_${id}`);
              const storedTimeInt = storedTime ? parseInt(storedTime, 10) : 0;
              return storedTimeInt > 0 ? storedTimeInt : timeMillisecond;
          });
          if (!localStorage.getItem(`testTime_${id}`)) {
              localStorage.setItem(`testTime_${id}`, timeMillisecond.toString());
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
            localStorage.setItem(`testTime_${id}`, newTime.toString());
            return newTime >= 0 ? newTime : 0;
        });
    };

    intervalId = setInterval(tick, 1000);

    return () => {
        clearInterval(intervalId);
    };
}, []);


  const getFormattedTime=(milliseconds)=>{


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
              correctNumber: 0,
              correctScore: 0,
              notSelectedNumber: 0,
              notSelectedScore: 0,
              incorrectNumber: 0,
              incorrectScore:0
            })
        })

        console.log(selectedAnswers);
  
        questions.map((data,dataIndex)=>{
          if(selectedAnswers[dataIndex] === data["answer"])
          {
              const subjectIndex = marks.findIndex(subject => subject.subject === data.courseID);
              marks[subjectIndex]["correctScore"]+=data.weightage;
              marks[subjectIndex]["correctNumber"]+=1;
              correctMarks += parseInt(data.weightage);
          }
          else if(selectedAnswers[dataIndex] === undefined)
          {
            const subjectIndex = marks.findIndex(subject => subject.subject === data.courseID);
            marks[subjectIndex]["notSelectedScore"]+=data.weightage;
            marks[subjectIndex]["notSelectedNumber"]+=1; 
            notSelectedMarks += parseInt(data.weightage);

          }
          else
          {
            const subjectIndex = marks.findIndex(subject => subject.subject === data.courseID);
            marks[subjectIndex]["incorrectNumber"]+=1;
            marks[subjectIndex]["incorrectScore"]+=data.weightage;
            incorrectMarks += parseInt(data.weightage);
          }
        }
        )
        console.log(user)
        // const userId = user ? user.id : null;
        await axios.post(`http://localhost:8000/test/${id}/studentMarks/${userId}`,{subjectMarks: marks, correctMarks : correctMarks, notSelectedMarks: notSelectedMarks, incorrectMarks: incorrectMarks});
        console.log("submited")
        navigate("/result",{ state: { testId: id } });
        
  }

  return (
    
    <div className='test-main-container'>
      {userId}
        <h2 className='gradient-underline'>{testName}</h2>
        <div className='timer-container'>
              <i className='fas fa-clock'></i>
             <div className='test-timer'>{getFormattedTime(time)}</div>
        </div>
         <div className='test-question-container '>
      {questions.map((question, questionIndex) => (
        <div className='with-border' key={question._id}>
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
              Submit
            </button>
          </div>
    </div>
    </div>
  )
}
