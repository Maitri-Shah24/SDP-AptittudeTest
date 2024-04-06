import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../components/SessionContext';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { baseurl } from '../services/Url';

export default function OverallResult() {
    const {id} = useParams();
    const [totalMarks, setTotalMarks] = useState(null);
    const navigate = useNavigate();
    const [averageResults, setAverageResults] = useState(null); 
    const [totalQuestion, setTotalQuestion] = useState(0);
    
    useEffect(() => {
        const fetchAverageResults = async () => {
            try {
                const response = await axios.get(`${baseurl}/test/${id}/average-results`);
                setAverageResults(response.data.studentMarks);
                setTotalMarks(response.data.totalMarks);
                const updatedTotalQuestion = response.data.studentMarks[0].marks.reduce((acc, data) => acc + data.correctNumber + data.incorrectNumber + data.notSelectedNumber, 0);
                setTotalQuestion(updatedTotalQuestion);
            } catch (error) {
                console.log("Fetching average results error: " + error);
            }
        };

        fetchAverageResults();
        // if (id) { // Only fetch average results if id is available
        //     fetchAverageResults();
        // }
    }, [id]);

    if (!averageResults && !totalMarks) {
        return <div>Loading...</div>;
    }

    const averageMarks = [];

    averageResults[0].marks.map((subjectResult) => {
        averageMarks.push({
            subject: subjectResult.subject,
            correctNumber: 0,
            correctScore: 0,
            notSelectedNumber: 0,
            notSelectedScore: 0,
            incorrectNumber: 0,
            incorrectScore:0
          })

    })
    
    averageResults.map((subjectResult)=>{
        subjectResult.marks.map((result)=>{
            const subjectIndex = averageMarks.findIndex(subject => subject.subject === result.subject);
            averageMarks[subjectIndex]["correctNumber"]+=result.correctNumber;
            averageMarks[subjectIndex]["correctScore"]+=result.correctScore;
            averageMarks[subjectIndex]["incorrectNumber"]+=result.incorrectNumber;
            averageMarks[subjectIndex]["incorrectScore"]+=result.incorrectScore;
            averageMarks[subjectIndex]["notSelectedNumber"]+=result.notSelectedNumber;
            averageMarks[subjectIndex]["notSelectedScore"]+=result.notSelectedScore;
        })
    })

    const averageSubjectResults = averageMarks.map((result)=>{
        return {
            subject: result.subject,
            correctNumber: result.correctNumber/averageResults.length,
            correctScore: result.correctScore/averageResults.length,
            incorrectNumber: result.incorrectNumber/averageResults.length,
            incorrectScore: result.incorrectScore/averageResults.length,
            notSelectedNumber: result.notSelectedNumber/averageResults.length,
            notSelectedScore: result.notSelectedScore/averageResults.length,
        };
    })

    console.log(averageSubjectResults)

    const overallAverageResult = {
        averageCorrectScore: averageResults.reduce((acc, subjectResult) => acc + subjectResult.correctMarks, 0) / averageResults.length,
        averageNotSelectedScore: averageResults.reduce((acc, subjectResult) => acc + subjectResult.notSelectedMarks, 0) / averageResults.length,
        averageIncorrectScore: averageResults.reduce((acc, subjectResult) => acc + subjectResult.incorrectMarks, 0) / averageResults.length,
    };

    let averageCorrect = 0;
    let averageIncorrect = 0;
    let averageNotSelected = 0;
    averageResults.map((result)=>{
        averageCorrect+=result.marks.reduce((acc, data) => acc + data.correctNumber, 0);
        averageIncorrect+=result.marks.reduce((acc, data) => acc + data.incorrectNumber, 0);
        averageNotSelected+=result.marks.reduce((acc, data) => acc + data.notSelectedNumber, 0);
    });

    const data = [
        { id: 0, value: overallAverageResult.averageCorrectScore, label: 'Correct Marks' },
        { id: 1, value: overallAverageResult.averageNotSelectedScore, label: 'Not Attempted Marks' },
        { id: 2, value: overallAverageResult.averageIncorrectScore, label: 'Incorrect Marks' },
    ];

    return (
        <>
        <button className='back-button' onClick={()=>navigate("/professordashboard")}>
        <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span>Back To DashBoard</span>
        </button>
        <div className='result-container'>
            <div className='overall-result'>
            <h2>Average Score: {overallAverageResult.averageCorrectScore} / {totalMarks.totalMarks}</h2>
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
                    <p style={{fontSize:'20px'}}>Correct Questions : {averageCorrect}</p>
                    <p style={{fontSize:'20px'}}>Incorrect Questions : {averageIncorrect}</p>
                    <p style={{fontSize:'20px'}}>Not Attempted Questions : {averageNotSelected}</p>
                </div>
                
            </div>
            
            {averageSubjectResults.map((subjectData, index) => (
                <div key={index} className='subject-result'>
                    <div className='subject-score'>
                         <h2>{subjectData.subject}</h2>
                         
                        <p>Average Score: {subjectData.correctScore}/{totalMarks.subjectWiseMarks[index]["marks"]}</p>
                       
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

