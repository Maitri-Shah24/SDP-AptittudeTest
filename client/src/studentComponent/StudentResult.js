import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '../components/SessionContext';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { baseurl } from '../services/Url';

export default function StudentResult() {
    const location = useLocation();
    const id = location.state ? location.state.testId : null;
    const { user } = useSession();
    const userId = typeof user === 'object' ? user.id : user;
    const [result, setResult] = useState(null);
    const [totalMarks, setTotalMarks] = useState(null);
    const navigate = useNavigate();
    const [totalCorrectNumber,setTotalCorrectNumber]  = useState(0);
    const [totalIncorrectNumber,setTotalIncorrectNumber] = useState(0);
    const [totalNotSelectedNumber,setTotalNotSelectedNumber] = useState(0);
    const [totalQuestion, setTotalQuestion] = useState(0);

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                console.log(user)
                const response = await axios.get(`${baseurl}/test/${id}/${userId}/result`);
                setResult(response.data.studentMarks);
                setTotalMarks(response.data.totalMarks);

                const updatedTotalCorrectNumber = response.data.studentMarks.marks.reduce((acc, data) => acc + data.correctNumber, 0);
                const updatedTotalIncorrectNumber = response.data.studentMarks.marks.reduce((acc, data) => acc + data.incorrectNumber, 0);
                const updatedTotalNotSelectedNumber = response.data.studentMarks.marks.reduce((acc, data) => acc + data.notSelectedNumber, 0);
                const updatedTotalQuestion = response.data.studentMarks.marks.reduce((acc, data) => acc + data.correctNumber + data.incorrectNumber + data.notSelectedNumber, 0);

        setTotalCorrectNumber(updatedTotalCorrectNumber);
        setTotalIncorrectNumber(updatedTotalIncorrectNumber);
        setTotalNotSelectedNumber(updatedTotalNotSelectedNumber);
        setTotalQuestion(updatedTotalQuestion);
            } catch (error) {
                console.log("Fetching result error: " + error);
            }
        };

        if (id) { // Only fetch marks if id is available
            fetchMarks();
        }
    }, [id, userId]);

    if (!result || !totalMarks) {
        return <div>Loading...</div>;
    }

    const data = [
        { id: 0, value: result.correctMarks, label: 'Correct Marks' },
        { id: 1, value: result.notSelectedMarks, label: 'Not Attempted Marks' },
        { id: 2, value: result.incorrectMarks, label: 'Incorrect Marks' },
    ];

    return (
        <>
        <button className='back-button' onClick={()=>navigate("/studentdashboard")}>
        <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span>Back To DashBoard</span>
        </button>
        <div className='result-container'>
            <div className='overall-result'>
            <h2>Your Score: {result.correctMarks} / {totalMarks.totalMarks}</h2>
                <PieChart
                    className='pie-chart'
                    series={[
                        {
                            data: data,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    height={200}
                    width={600}
                />
                <p style={{fontSize:'20px'}}>Total Question : {totalQuestion}</p>
                <div className='total-question'>                
                    <p style={{fontSize:'20px'}}>Correct Questions : {totalCorrectNumber}</p>
                    <p style={{fontSize:'20px'}}>Incorrect Questions : {totalIncorrectNumber}</p>
                    <p style={{fontSize:'20px'}}>Not Attempted Questions : {totalNotSelectedNumber}</p>
                </div>
                
            </div>
            
            {result.marks.map((subjectData, index) => (
                <div key={index} className='subject-result'>
                    <div className='subject-score'>
                         <h2>{subjectData.subject}</h2>
                         
                        <p>Your Score: {subjectData.correctScore}/{totalMarks.subjectWiseMarks[index]["marks"]}</p>
                       
                        <div style={{fontSize:'20px'}}>Questions not Attempted : {subjectData.notSelectedNumber}</div>
                        <div style={{fontSize:'20px'}}>Questions Correct : {subjectData.correctNumber}</div>
                        <div style={{fontSize:'20px'}}>Questions Incorrect : {subjectData.incorrectNumber}</div>
                        
                    </div>
                    <PieChart
                        className='pie-chart'
                        series={[
                            {
                                data: [
                                    { id: 0, value: subjectData.correctScore, label: 'Correct Marks' },
                                    { id: 1, value: subjectData.notSelectedScore, label: 'Not Attempted Marks' },
                                    { id: 2, value: subjectData.incorrectScore, label: 'Incorrect Marks' },
                                ],
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        height={200}
                    />
                </div>
            ))}

        <div className='add-que TestDetails-button'>  
            <button type="submit" className="submit" onClick={()=>navigate(`/questionanswer/${id}`)} >
              View Correct Answer
            </button>
        </div>
        </div>
        </>
    );
}
