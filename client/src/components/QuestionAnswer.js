import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function QuestionAnswer() {

    const {id} = useParams();
    const [question,setQuestions] = useState([]);
    const [testName, setTestName] = useState();
    const navigate = useNavigate();
    const role = sessionStorage.getItem('userRole');
    console.log(question);

    const options = ['a', 'b', 'c', 'd'];

    useEffect(()=>{
        const fetchQuestions = async()=>{
            try{
                const response = await axios.get(`http://localhost:8000/test/${id}/questions`);
                setQuestions(response.data);
                const response2 = await axios.get(`http://localhost:8000/test/${id}/duration`);
                setTestName(response2.data.testName);

            }
            catch(error)
            {
                console.log("Error fetching Question ", error);
            }
        }

        fetchQuestions();
    },[])

    return (
        <>
        <button className='back-button' onClick={()=>role==='professor'?navigate("/professordashboard"):navigate("/studentdashboard")}>
        <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span>Back To DashBoard</span>
        </button>

        <div className='test-main-container'>
            <h2 className='gradient-underline'>{testName}</h2>
            <div className='test-question-container '>
            {question.map((question, questionIndex) => (
            <div key={question._id}>
                <p className="question-answer-subject">{question.courseID}</p>
                <h3>{questionIndex+1}. {question.question}</h3>
                {options.map((option, optionIndex) => (
                    <div className='options' key={optionIndex}>
                    <p className="option">{option} : {question[`option${optionIndex+1}`]}</p>
                    </div>
                ))}  
                <div className="show-answer">
                    <strong>Answer:</strong> {question.answer}
                  </div>
            </div>
            ))} 
            </div>
        </div>
        </>

    )
}
