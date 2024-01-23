import React, { useState } from 'react'
import Question from '../Question.json'
import { useParams } from 'react-router-dom';

export default function QuestionPage() {
    const { subject } = useParams();
    const decodedSubject = decodeURIComponent(subject);
    const sub = Question[decodedSubject];
    const [selectedQuestion, setSelectedQuestion] = useState(null);

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
//   return (
//     <div className="question-page-container">
//         <h2 className='gradient-underline'>{decodeURIComponent(subject)}</h2>
//         {sub.map((list,index)=>(
//             <div className='inner-ques-container'>
//             <h6 className="question">Question {list.id}</h6>
//             <p>{list.ques}</p>
//             <ul className="options">
//                 <li className="option">A. {list.op1}</li>
//                 <li className="option">B. {list.op2}</li>
//                 <li className="option">C. {list.op3}</li>
//                 <li className="option">D. {list.op4}</li>
//             </ul>
//             <button onClick={() => handleShowAnswer(list.id)}>Show Answer</button>
//              {selectedQuestion === list.id && (
//             <div className="show-answer">
//               <strong>Answer:</strong> {list.ans}
//             </div>
//           )}
//             </div>
//         ))}
//     </div>
  )
}
