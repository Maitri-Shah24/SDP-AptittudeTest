import React, { useState } from 'react'
import Question from '../Question.json'
import { useNavigate, useParams } from 'react-router-dom';

export default function QuestionPage() {
    const { subject } = useParams();
    const decodedSubject = decodeURIComponent(subject);
    const sub = Question[decodedSubject];
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const navigate = useNavigate();
    const role = sessionStorage.getItem('userRole');

  const handleShowAnswer = (questionId) => {
    setSelectedQuestion(questionId === selectedQuestion ? null : questionId);
  };

  const groupQuestionsIntoPairs = () => {
    const pairs = [];
    for (let i = 0; i < sub.length; i += 2) {
      const pair = [sub[i]];
      if (i + 1 < sub.length) {
        pair.push(sub[i + 1]);
      }
      pairs.push(pair);
    }
    return pairs;
  };

  return (
    <>
    <button className='back-button' onClick={()=>role==='professor'?navigate("/professordashboard"):navigate("/studentdashboard")}>
        <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span>Back To DashBoard</span>
        </button>
    <div className="question-page-container">
      <h2 className='gradient-underline'>{decodedSubject}</h2>
      {groupQuestionsIntoPairs().map((pair, rowIndex) => (
        <div className='row with-border' key={rowIndex}>
          {pair.map((question, colIndex) => (
            <div className='col-md-6' key={colIndex}>
              <div className='inner-ques-container'>
                <h6 className="question">Question {question.id}</h6>
                <p>{question.ques}</p>
                <ul className="options">
                  <li className="option">A. {question.op1}</li>
                  <li className="option">B. {question.op2}</li>
                  <li className="option">C. {question.op3}</li>
                  <li className="option">D. {question.op4}</li>
                </ul>
                <button onClick={() => handleShowAnswer(question.id)}>Show Answer</button>
                {selectedQuestion === question.id && (
                  <div className="show-answer">
                    <strong>Answer:</strong> {question.ans}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
    )
}
