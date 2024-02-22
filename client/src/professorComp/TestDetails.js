import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function TestDetails (){
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);

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

  const history = useNavigate();
  function handleSubmit(){
    history(`/addQue/${id}`);
  }

  const handleDelete = async (questionId) => {

    const testId = id;
   
      try {
        const response = await axios.get(`http://localhost:8000/test/${testId}/${questionId}/marks`);

        let updatedSubjectWiseMarks =[...response.data.subjectWiseMarks];
        const subjectIndex = updatedSubjectWiseMarks.findIndex(subjectMark => subjectMark.subject === response.data.question.courseID);

        response.data.totalMarks -= parseInt(response.data.question.weightage);
        updatedSubjectWiseMarks[subjectIndex].marks-=parseInt(response.data.question.weightage);         

      await axios.put(`http://localhost:8000/test/${testId}/update`, {
          subjectWiseMarks: updatedSubjectWiseMarks,
          totalMarks: response.data.totalMarks
      });

      await axios.delete(`http://localhost:8000/questions/${questionId}/delete`);
        setQuestions(questions.filter(question => question._id !== questionId));
      } catch (error) {
        console.error('Error deleting question:', error);
      }
  };

  return (
    <div className='TestDetails-container'>
      <h2 className='gradient-underline'>Questions</h2>
      {questions.map((question) => (
        <div key={question._id} className="question-container with-border">
          <p>{question.question}</p>
          <button className="delete-button" onClick={() => handleDelete(question._id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
       <div className='add-que TestDetails-button'>  
            <button type="submit" className="submit" onClick={handleSubmit} >
              ADD QUESTIONS
            </button>
        </div>
    </div>
  );
};

